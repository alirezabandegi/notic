# Notic - Your Personal Productivity Hub

Welcome to **Notic**, at Notic, we are passionate about simplifying your digital life. Our team is dedicated to creating user-friendly applications that enhance your productivity and bring joy to your daily routine. Join us on this journey towards a more organized and efficient you!

## Applications

### File Structure

The repository contains the following files:

- `index.html`: Main HTML file serving as the entry point for the application.
- `main.js`: JavaScript file containing the main logic for initializing the application.
- `appHomepage.js`: defines the HTML content for the homepage of an application, highlighting its key features and providing links to further resources.
- `stickynote.js`: manages a web application's sticky notes, enabling creation, deletion, searching, categorization, and UI updates, utilizing local storage for data persistence and manipulation.
- `calendar.js`: creates a dynamic calendar with month and year selection, day highlighting, and current time display.
- `favorite.js`: None
- `help.js`: displays FAQs categorized by app sections (Sticky Note, Calendar, Settings) dynamically on HTML.
- `settings.js`: JavaScript file containing classes and functions for managing settings-related functionalities.

### Sticky Notes
Effortlessly jot down thoughts, ideas, and reminders with our intuitive Sticky Notes app.

### Calendar
Stay organized and never miss an important date with our feature-rich Calendar app.

### Settings
Personalize your Notic experience with customizable settings. Manage user settings, personal information, profile pictures, security settings, and storage usage all in one place.

## Features

- **Favorites**: Save and organize your favorite items for easy access.
- **Help Center**: Get assistance and guidance through our Help Center, ensuring a smooth user experience.

## Contact Us

Have questions, feedback, or suggestions? We value your input! Reach out to us at [Alireza Bandegi](https://github.com/alirezabandegi) and let us know how we can better serve you.

## Connect With Us

Follow us on social media to stay connected and receive real-time updates:

- [Instagram](https://www.instagram.com/alirezamaxery)
- [GitHub](https://github.com/alirezabandegi)

Thank you for choosing Notic - where productivity meets simplicity!

---

## StickyNote Application

a web-based application developed to help users organize their thoughts, ideas, and tasks through sticky notes.

### Introduction

The `stickynote.js` file is an essential component of the StickyNote App, responsible for handling various functionalities such as creating, editing, and managing sticky notes. It utilizes JavaScript to interact with the DOM and manage local storage for storing note data.

### Features

- Create and edit sticky notes with customizable titles and content.
- Organize notes into categories for better management.
- Search for notes by title or category.
- Delete notes or categories as needed.
- Limit the number of characters in note titles for concise organization.

### Getting Started

To get started with the StickyNote App, follow these steps:

1. Clone the Notic repository to your local machine:

    ```
    git clone https://github.com/alirezabandegi/notic.git
    ```

2. Open the `stickynote.js` file in your preferred code editor to explore and modify the code.

3. Integrate the `stickynote.js` file with the rest of your application to enable sticky note functionality.

### Usage

The `stickynote.js` file provides a class called `stickyNoteApp`, which encapsulates the logic for managing sticky notes. It includes methods for adding, deleting, and searching notes, as well as handling user interactions with the application interface.

To use the `stickyNoteApp` class within your application:

1. Instantiate the class and pass the main HTML element as a parameter.
2. Utilize the class methods to interact with sticky notes, categories, and search functionality.
3. Customize the class methods or extend the functionality as needed for your application.

---

## Calendar Application Help Section

### How do I navigate to a specific month and year?
You can navigate to a specific month and year by clicking on the month displayed at the top of the calendar. This will open a dropdown list of months, from which you can select the desired month. Additionally, you can click on the arrows ("<" for the previous year and ">" for the next year) next to the year to navigate to the previous or next year respectively.

### How can I see today's date on the calendar?
Today's date is highlighted on the calendar by default. It is displayed in a different color or style to distinguish it from other dates.

### What if I want to see the days of a specific week?
Currently, the calendar displays the entire month. However, if you want to see the days of a specific week, you can easily do so by identifying the first day of that week (usually Sunday or Monday) and then observing the days following it.

### How do I handle leap years in the calendar?
Leap years are handled automatically by the calendar. February will display 29 days instead of 28 in a leap year.

### Is there any way to integrate events or reminders into the calendar?
Currently, the calendar app does not have built-in support for adding events or reminders. However, you can extend the functionality by incorporating event-handling features using JavaScript. This could include adding event listeners to specific dates and displaying event details when clicked.

---

## Settings Application

Welcome to the Settings App repository! This repository contains the source code for a web application designed to manage user settings, personal information, profile pictures, security settings, and storage usage.

### Introduction

The Settings App is a web-based application developed using HTML, CSS, and JavaScript. It provides users with a comprehensive interface to customize their settings, update personal information, manage profile pictures, enhance security, and monitor storage usage.

### Features

- **Settings Overview:** Navigate through different sections to manage various settings.
- **Personal Info:** Update name, email address, and phone number.
- **Profile Picture:** Upload, change, or remove profile pictures.
- **Security:** Change account passwords for enhanced security.
- **Storage:** Monitor storage usage and upgrade storage plans if needed.

### Getting Started

To get started with the Settings App, follow these steps:

1. Clone the Notic repository to your local machine:

    ```
    git clone https://github.com/alirezabandegi/notic.git
    ```

2. Open the `index.html` file in your web browser to launch the application.

3. Explore different sections and customize your settings as needed.

### Usage

Once you have the Settings App running, you can:

- Navigate through different sections using the buttons provided.
- Update personal information in the "Personal Info" section.
- Manage profile pictures in the "Profile Picture" section.
- Change account passwords in the "Security" section.
- Monitor storage usage and upgrade storage plans in the "Storage" section.

---

## Contributing

Contributions to the Notic project are welcome! If you have any ideas for improvements, bug fixes, or new features, feel free to submit a pull request or open an issue on GitHub.