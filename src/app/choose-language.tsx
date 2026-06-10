import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { Language } from "@/types/learning";
import PrimaryButton from "@/components/PrimaryButton";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useUser } from "@clerk/expo";
import { useLanguageStore } from "@/store/useLanguageStore";
import { usePostHog } from "posthog-react-native";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ChooseLanguage() {
  const router = useRouter();
  const { user } = useUser();
  const posthog = usePostHog();
  const isAuthenticated = Boolean(user);
  
  const storeSelectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const setSelectedLanguageStore = useLanguageStore((state) => state.setSelectedLanguage);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(
    storeSelectedLanguageId || "es"
  );

  const showBackButton = !isAuthenticated || !!storeSelectedLanguageId;

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateBackOrHome = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const trackLanguageSelected = (id: string) => {
    const selectedLang = languages.find((lang) => lang.id === id);
    if (selectedLang && posthog) {
      posthog.capture("language_selected", {
        language_code: selectedLang.id,
        language_name: selectedLang.name,
      });
    }
  };

  const handleSelect = (id: string) => {
    trackLanguageSelected(id);
    setSelectedLanguageId(id);
    setSelectedLanguageStore(id);
    navigateBackOrHome();
  };

  const handleContinue = () => {
    if (selectedLanguageId) {
      trackLanguageSelected(selectedLanguageId);
      setSelectedLanguageStore(selectedLanguageId);
      navigateBackOrHome();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {showBackButton ? (
            <Pressable onPress={navigateBackOrHome} style={styles.backButton} hitSlop={8}>
              <AntDesign name="left" size={24} color="#111827" />
            </Pressable>
          ) : (
            <View style={styles.headerPlaceholder} />
          )}
          <Text style={styles.headerTitle}>Choose a language</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <AntDesign name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Popular</Text>

          <View style={styles.languagesList}>
            {filteredLanguages.map((lang: Language) => {
              const isSelected = lang.id === selectedLanguageId;

              return (
                <Pressable
                  key={lang.id}
                  onPress={() => handleSelect(lang.id)}
                  style={[
                    styles.languageItem,
                    isSelected && styles.languageItemSeclected,
                  ]}
                >
                  <View style={styles.languageInfo}>
                    <View style={styles.flagContainer}>
                      {typeof lang.flag === "string" ? (
                        <Text style={styles.flagText}>{lang.flag}</Text>
                      ) : (
                        <Image source={lang.flag} style={styles.flagImage} resizeMode="contain" />
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.languageName}>{lang.name}</Text>
                      {lang.learnersCount && (
                        <Text style={styles.learnerCount}>{lang.learnersCount}</Text>
                      )}
                    </View>
                  </View>

                  {isSelected ? (
                    <View style={styles.checkContainer}>
                      <AntDesign name="check" size={14} color="#ffffff" />
                    </View>
                  ) : (
                    <AntDesign name="right" size={16} color="#9ca3af" />
                  )}
                </Pressable>
              );
            })}

            {filteredLanguages.length === 0 && (
              <Text style={styles.emptyText}>No languages found matching &quot;{searchQuery}&quot;</Text>
            )}
          </View>
        </ScrollView>

        {/* Actions & Bottom Graphic Footer */}
        <View style={styles.footer}>
          <View style={styles.actionContainer}>
            <PrimaryButton
              text="Continue"
              onPress={handleContinue}
              style={!selectedLanguageId ? styles.disabledButton : undefined}
            />
          </View>
          <Image source={images.earth} style={styles.earthImage} resizeMode="cover" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    flex: 1,
  },
  headerPlaceholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 24,
    marginHorizontal: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },
  languagesList: {
    gap: 12,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
  },
  languageItemSeclected: {
    borderColor: "#8b5cf6",
    backgroundColor: "#faf5ff",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
   flagContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  flagText: {
    fontSize: 26,
  },
  flagImage: {
    width: 44,
    height: 44,
  },
  textContainer: {
    justifyContent: "center",
  },
  languageName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  learnerCount: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
    marginTop: 24,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  actionContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  earthImage: {
    width: "100%",
    height: 140,
    marginTop: 8,
  },
});
