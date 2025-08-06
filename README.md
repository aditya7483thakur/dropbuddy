# Dropubuddy 📁✨

**Dropubuddy** is a file management platform that allows users to upload images and files, create folders (including nested folders), and manage their content with an intuitive UI. It supports secure authentication, trash handling, and responsive design — making it easy to store and organize your files efficiently.

---

## 🔗 Live Demo

👉 [Try Dropubuddy Live](https://dropbuddy.vercel.app/)

---

## 🚀 Features

- 🔐 **Authentication** using Clerk
- 📁 **Folder Management**
  - Create folders and nested folders
  - Navigate hierarchical structure
- 📤 **File Uploading**
  - Upload images directly via ImageKit
- 🗑️ **Trash Handling**
  - Move files/folders to trash
  - Empty trash deletes from DB & ImageKit
- 📱 **Responsive Design**
  - Optimized for all screen sizes

---

## 🛠️ Tech Stack

| Technology       | Role                                |
|------------------|-------------------------------------|
| **Next.js**      | FullStack framework                 |
| **Clerk**        | User authentication                 |
| **ImageKit**     | Image storage and delivery          |
| **Drizzle**      | ORM for database management         |
| **PostgreSQL**   | Relational database                 |
| **Tailwind CSS** | Utility-first styling framework     |
| **Vercel**       | Deployment platform                 |

---

## ⚙️ Installation & Setup

1. **Clone the repository and open it in VS Code**
   ```bash
   git clone https://github.com/aditya7483thakur/dropbuddy
   cd dropubuddy
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create an `.env` file in the root directory**  
   Copy the environment variables listed in the `.env.sample` file (located in the root directory),  
   paste them into your `.env`, and add your actual credentials.
   
5. **Run the development server**
   ```bash
    npm run dev
   ```

## 🙌 Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request to improve the project.
