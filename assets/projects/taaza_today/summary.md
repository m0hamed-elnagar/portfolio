# Taaza Today – Multi-Flavor News & Short-Video Platform

Taaza Today is a production-ready Android application built with a Kotlin-first approach. It delivers real-time news in Hindi and English, integrates short-form videos ("Shorts" and "Quiks"), and employs a multi-flavor strategy for administrative and consumer use cases.

## Project Overview

- **Purpose:** A bilingual news aggregator and short-video platform for regional Indian users.
- **Architecture:** MVVM + Clean Architecture (Presentation → Domain ← Data).
- **Tech Stack:**
  - **UI:** Jetpack Compose (Material 3) with type-safe navigation.
  - **Language:** 100% Kotlin (Coroutines, Flow, Sealed Classes).
  - **DI:** Koin with flavor-specific modules.
  - **Networking:** Ktor Client + Kotlinx-Serialization.
  - **Database:** Room with Reactive Flow streams.
  - **State Management:** Kotlin Coroutines + StateFlow/SharedFlow.
  - **Notifications:** Firebase Cloud Messaging (FCM) with topic-based segmentation.
  - **Localization:** Dynamic switching between Hindi and English using `Lingver`.
  - **Content Integration:** YouTube Android Player and custom HTML rendering (Jsoup).

## Building and Running

The project uses Gradle product flavors to manage different app variants.

- **User Flavor:** Standard consumer app.
  ```bash
  ./gradlew assembleUserDebug
  ```
- **Admin Flavor:** Includes content management tools like the Notification Composer.
  ```bash
  ./gradlew assembleAdminDebug
  ```
- **Quiks Flavor:** A specialized variant for quick news/shorts.
  ```bash
  ./gradlew assembleQuiksDebug
  ```
- **Release Build:** Requires `local.properties` to contain `BLOGGER_API_KEY` and signing configuration.

## Project Structure

- `app/src/main`: Shared codebase, core logic, and common UI components.
- `app/src/admin`: Admin-only features (e.g., `FcmSender`, notification UI).
- `app/src/user`: Consumer-specific overrides or features.
- `app/src/quiks`: Features specific to the Quiks variant.

### Key Packages
- `com.rawderm.taaza.today.app`: Application entry point, `MainActivity`, and Navigation (`Route.kt`, `App.kt`).
- `com.rawderm.taaza.today.bloger.data`: Repositories, Paging Sources, Database (Room), and Network (Ktor) implementations.
- `com.rawderm.taaza.today.bloger.domain`: Domain models and repository interfaces.
- `com.rawderm.taaza.today.bloger.ui`: Jetpack Compose screens, ViewModels, and UI state definitions.
- `com.rawderm.taaza.today.di`: Koin modules configuration (`Modules.kt`).
- `com.rawderm.taaza.today.core`: Shared utilities, notification service, and theme definitions.

## Development Conventions

- **Reactive UI:** Always use `collectAsState()` or `collectAsStateWithLifecycle()` for Flow-based state in Composables.
- **Dependency Injection:** Use Koin's `koinViewModel()` for ViewModels and `koinInject()` for other dependencies in Compose.
- **Type-Safe Navigation:** Navigation routes are defined as `@Serializable` objects in `Route.kt`.
- **Flavor Awareness:** Place flavor-specific logic in the respective `admin` or `user` source sets to keep the `main` source set clean.
- **Deep Linking:** Handled in `AppNavigation` using `navDeepLink` and a centralized `DeepLinkHandler`.
- **Localization:** Persistent language preferences are managed via `LanguageDataStore` and applied using `Lingver`.

## Key Files
- `app/src/main/java/.../app/BloggerApplication.kt`: Application initialization (Koin, Firebase, Localization).
- `app/src/main/java/.../app/App.kt`: Root Composable and NavHost configuration.
- `app/src/main/java/.../di/Modules.kt`: Central DI registry.
- `app/src/main/java/.../bloger/data/database/FavoritePostDataBase.kt`: Room database definition.
- `app/src/admin/java/.../bloger/data/FcmSender.kt`: Admin tool for sending push notifications.
