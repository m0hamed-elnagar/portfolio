# Sheet Compute - Employee Attendance System

[![Kotlin](https://img.shields.io/badge/Kotlin-2.2.0-blue.svg?style=flat&logo=kotlin)](https://kotlinlang.org)
[![Android](https://img.shields.io/badge/Android-SDK%2026%2B-green.svg?style=flat&logo=android)](https://developer.android.com)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-lightgrey.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![Hilt](https://img.shields.io/badge/DI-Hilt%202.57-orange.svg)](https://developer.android.com/training/dependency-injection/hilt-android)
[![Room](https://img.shields.io/badge/DB-Room%202.7.2-blue.svg)](https://developer.android.com/training/data-storage/room)
[![Paging 3](https://img.shields.io/badge/Paging-3.3.6-blue.svg)](https://developer.android.com/topic/libraries/architecture/paging/v3-paged-data)

**Sheet Compute** is a high-performance Android application engineered for precision employee attendance tracking and complex timesheet management. Built with a focus on enterprise-grade data portability, it solves the challenge of bridging legacy Excel-based workflows with modern mobile management systems.

---

## ✨ Core Features

### 📊 Advanced Excel Engine
Built to handle real-world organizational data with deep integration.
- **High-Fidelity Parsing**: Utilizes **Apache POI** to parse `.xls` records with zero data loss.
- **Intelligent Validation**: Multi-step validation logic with detailed rejection reporting for corrupted or invalid entries.
- **Two-Way Portability**: Seamlessly import attendance records and export processed employee data back to Excel format.

### ⏰ Precision Tracking & Calculation
- **Automated Tardiness Engine**: Configurable work-start logic that automatically computes late durations and attendance statuses.
- **Dynamic Holiday System**: Full management of holidays and weekend configurations, ensuring working-day calculations are always accurate.
- **Historical Insights**: Paged attendance summaries with intuitive month/year filtering and real-time employee search.

### ⚙️ Enterprise Infrastructure
- **Feature Management**: Integrated **Firebase Remote Config** for real-time feature toggling and system updates.
- **Offline-First Resilience**: Robust local persistence layer using **Room** ensures the app remains fully functional in low-connectivity environments.
- **Performance Optimized**: Leverages **Paging 3** for smooth, low-memory scrolling through thousands of attendance records.

---

## 🏛️ Technical Architecture
The project strictly adheres to **Modular Clean Architecture** and **MVVM** patterns to ensure maximum testability and maintainability.

### Layer Breakdown:
1.  **Data Layer**:
    *   **Room Persistence**: Handles `EmployeeEntity`, `AttendanceRecord`, and `Holiday` models.
    *   **Paging Sources**: Optimized data streams for the UI layer.
    *   **Mappers**: Clean transformation between raw entities and UI-ready models.
2.  **Domain Layer (Pure Business Logic)**:
    *   **Use Cases**: Atomic business logic units (e.g., `CountWorkingDays`, `ParseExcelSheet`).
    *   **Excel Logic**: Specialized parsers and calculation engines decoupled from Android frameworks.
    *   **DI Modules**: Centralized dependency management via **Hilt**.
3.  **UI Layer (Presentation)**:
    *   **Reactive State**: State management powered by **Flow** and **LiveData**.
    *   **Modern Components**: View Binding, Material 3, and custom Calendar views for a premium UX.

---

## 🧪 Testing Strategy
Quality is enforced via a rigorous testing pyramid:
- **Unit Testing**: Comprehensive coverage for ViewModels, Use Cases, and Excel parsing logic using `MockK` and `Truth`.
- **Coroutines Testing**: Specialized testing rules (`MainDispatcherRule`) and `Turbine` for reactive Flow validation.
- **Instrumented Tests**: DAO-level verification ensuring database integrity across migrations.

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Core Language** | Kotlin 2.2.0 |
| **Dependency Injection** | Hilt 2.57 |
| **Database** | Room 2.7.2 |
| **Asynchronous Logic** | Coroutines 1.10.2 & Flow |
| **Architecture** | Clean Architecture + MVVM |
| **UI Framework** | Material 3, View Binding, Navigation Component |
| **Pagination** | Paging 3 (3.3.6) |
| **Excel Handling** | Apache POI 3.17 |
| **Backend** | Firebase Remote Config |

---

## 🚀 Development & Build

### Prerequisites
- Android Studio (Koala+)
- JDK 11
- Android SDK 35

### Commands
```bash
# Clean and Build
./gradlew clean build

# Run Unit Tests
./gradlew test

# Assemble Debug APK
./gradlew assembleDebug
```

---

## 📄 License
Private - All rights reserved.
