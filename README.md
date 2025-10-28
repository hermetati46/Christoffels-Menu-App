# Student Information
Name: Hermenegildo Zuzi Tati

Student Number: ST10494935

Course: Higher Certificate of Mobile Application and Web Development (HMAW)

MAST5112: Part 2 and 3 (Portfolio of Evidence)

Github Repository: https://github.com/hermetati46/Christoffels-Menu-App

Youtube Link: https://youtu.be/lvrrrC2VZ78

# Project Overview
Christoffel's Menu is a streamlined tool to replace complex digital menu systems. A chef can quickly update the day's offerings, ensuring the menu is always current. The application features a clean, user-friendly design focused on efficiency and ease of use. It also includes a filtered "guest view" to see the menu as a customer would.

# How It Works
The application is built around a few key screens, allowing for a logical and straightforward user experience:

- **Welcome Screen:** The app opens with a splash screen featuring the restaurant's logo, which automatically transitions to the main dashboard.

- **Home Screen (Dashboard):** This is the central hub. Here, the chef can see a complete list of all menu items. From this screen, they can:
  - Tap "Add Item" to navigate to the Add Item screen.
  - Tap the delete icon next to an item to remove it.
  - Tap "Filter" to see the customer-facing menu view.

- **Add Item Screen:** A form for adding a new dish to the menu. The chef can input the dish name, a description, the price, and select a course (e.g., Starters, Mains, Desserts). Tapping "Save" adds the item and returns to the Home Screen, while "Cancel" discards the changes.

- **Filter Screen (Today's Menu):** This screen displays the menu from a customer's perspective. The chef can filter the view by course category (All, Starters, Mains, Desserts) to see how the menu is organized. A "Back to Dashboard" button returns them to the Home Screen.

# Features
- **View All Menu Items:** A clear, scrollable list of all dishes on the Home Screen.

- **Add New Dishes:** Easily add new items with details like name, description, price, and course.

- **Delete Dishes:** Remove items from the menu with a single tap.

- **Filter Menu:** View the menu by specific courses, simulating a guest's experience.

# Screenshots

1. **Welcome Screen**
<img width="541" height="911" alt="Welcome" src="https://github.com/user-attachments/assets/2b9be33c-a6b0-4564-9f91-270a693c8135" />


<br>
<br>

2. **Home Screen** 
<img width="547" height="915" alt="Home 2" src="https://github.com/user-attachments/assets/45fb135c-6cf1-493a-a948-1a2e140c7719" />



<br>
<br>

3. **Add Item Screen:**
<img width="546" height="911" alt="Add Item 2" src="https://github.com/user-attachments/assets/5223054d-f3bd-41b5-8fa7-9f4658d4cefd" />


<br>
<br>

4. **Filter Screen:**
<img width="543" height="915" alt="Filter 2" src="https://github.com/user-attachments/assets/474373a1-00ec-490b-b86c-231e6921387e" />


# Changelog
- 2025-10-06: Initial release of Christoffel's Menu App. Project logic implemented. Pushed initial commits to remote repository. Created README.md file

- 2025-10-28: Added statistics display (Stats Card component) and calculates statistics of menu items (Average Prices and Quantity of each course).

- 2025-11-12: Refactored AddItemScreen, FilterScreen, and HomeScreen with improved UI, styling, input functionality, and enhanced statistics display, along with better handling of empty states and responsiveness.

# References
- React Nactive. (2025). Core Components and Native Components. [online] Available at: <https://reactnative.dev/docs/intro-react-native-components> [Accessed 4 October 2025].

- React Nactive. (2025). Navigating Between Screens. [online] Available at: <https://reactnative.dev/docs/navigation> [Accessed 4 October 2025].

- React Nactive. (2025). FlatList. [online] Available at: <https://reactnative.dev/docs/flatlist> [Accessed 4 October 2025].
