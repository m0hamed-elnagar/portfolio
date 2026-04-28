# Taaza Today – Multi-Flavor, Multi-Language News & Short-Video Android Platform

i> Kotlin-first Android application delivering real-time Hindi & English news, short-form videos ("Shorts"), and push-driven content discovery — built with admin, consumer, and video-first product flavors.

---

## 1. Value Proposition

India's regional-language users need bilingual news that works seamlessly across different content types. Taaza Today solves this by:

* **Unified Content Aggregation** - Bringing together blog articles and YouTube shorts in one cohesive experience.
* **Seamless Language Support** - Instant Hindi ⇄ English switching with persistent user preferences via `Lingver`.
* **Targeted Notifications** - Topic-based push notifications (FCM) ensuring users receive relevant content.
* **Multi-Flavor Strategy** - Dedicated `admin`, `user`, and `quiks` builds for different user roles and content consumption styles.

---

## 2. Tech Stack & Engineering Highlights

### **Core Technologies**
| Category | Technology |
|---|---|
| **Language** | Kotlin 100% (Coroutines, Flow, Sealed Classes) |
| **UI Framework** | Jetpack Compose (Material 3) |
| **Architecture** | MVVM + Clean Architecture (Presentation → Domain ← Data) |
| **DI / Networking** | Koin, Ktor Client, Kotlinx-Serialization |
| **Persistence** | Room Database with Reactive Flow streams |
| **Notifications** | Firebase Cloud Messaging with topic segmentation |

### **Key Achievements**
* **Scalable Data Persistence**: Architected a robust local database using Room, implementing reactive Flow streams for real-time UI updates and efficient CRUD operations.
* **Enterprise Notification System**: Integrated FCM with priority-based delivery and deep linking, supporting targeted bilingual content distribution.
* **Modern UI Development**: Developed a declarative UI with Jetpack Compose, improving maintainability and performance across complex screens like the Home Feed and Article Details.
* **Bilingual Experience**: Designed dynamic language switching with persistent storage, enabling seamless regional market expansion.
* **Robust DI System**: Built a modular dependency injection foundation using Koin, facilitating flavor-specific module loading and improved testability.
* **Advanced Content Handling**: Engineered custom HTML rendering using Jsoup and YouTube player integration for a unified media experience.

---

## 3. Installation & Setup

### Prerequisites
- Android Studio Hedgehog or later
- Android SDK API 26+
- Kotlin 1.9.0+

### Build Instructions
```bash
# Clone the repository
git clone https://github.com/m0hamed-elnagar/Taaza-Today.git

# Build user variant
./gradlew assembleUserDebug

# Build admin variant  
./gradlew assembleAdminDebug

# Build quiks variant
./gradlew assembleQuiksDebug
```

### Configuration
1. **Firebase Setup** - Add `google-services.json` to the `app` module.
2. **API Configuration** - Ensure `BLOGGER_API_KEY` is set in your `local.properties`.
3. **Build Selection** - Choose between `admin`, `user`, or `quiks` flavors in the Build Variants tab.

---

## 4. Key Features

### **Core Functionality**
- **Bilingual Content** - English and Hindi news articles with seamless switching.
- **Short-Form Video** - Integrated YouTube shorts with optimized in-app playback.
- **Content Management** - Favorite posts and shorts with cross-session persistence via Room.
- **Push Notifications** - Topic-based alerts with deep link support for immediate engagement.

### **User Experience**
- **Material 3 Design** - Modern, intuitive interface following the latest Android guidelines.
- **Deep Linking** - Advanced navigation support for sharing and external content entry.
- **Performance Optimized** - Efficient image loading (Coil) and smooth scrolling lists (Paging 3).

---

## 5. App Screenshots
| Home Feed | Shorts/Quiks | Favorites | Article Detail |
|---|---|---|---|
| ![Home Screen](assets/home.jpg) | ![Shorts Screen](assets/shorts.jpg) | ![Favorites Screen](assets/favorites.jpg) | ![Article Detail](assets/article_detail.jpg) |

| More Options | Admin Dashboard | Quiks Screen |
|---|---|---|
| ![More Tab](assets/more.jpg) | ![Admin Home](assets/home_admin.jpg) | ![Quiks Screen](assets/quiks.jpg) |

---

## 6. Architecture & Code Quality

### **Clean Architecture Implementation**
```
app/src/
├── admin/          # Admin-specific features (FCM Sender, Admin UI)
├── user/           # User-facing features and UI overrides
├── quiks/          # Video-centric variant features
├── main/           # Shared codebase (Core logic, Domain, Data)
```

- **Separation of Concerns** - Clear boundaries between Data, Domain, and Presentation layers.
- **Reactive Programming** - Heavy use of Kotlin Flow for state management.
- **Maintainable Code** - Repository pattern combined with DI for high testability.

---

## 7. License

This project is proprietary software. All rights reserved.

## 8. Contact

**Developer**: Mohamed Elnagar  
**Email**: mohamed.3lnagar@gmail.com