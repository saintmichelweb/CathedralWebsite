# St-Michel-Website

Website for Paroisse Saint Michel Kigali  

---

## 🚀 How to Run the App Using Docker

### 🛠 Development Mode
For local development with hot reload:

```bash
docker compose -f docker-compose-dev.yml up -d --build
````

This will:

* Start the **database**, **API (dev mode)**, **Portal (dev mode)**, and **Front-end**
* Mount volumes so changes in `Api/src`, `Portal/src`, or `Front-end` are reflected without rebuilding
* Use `http://localhost:3550/portal` for the Portal
* Use `http://localhost:3000` for the Next.js Front-end
* Use `http://localhost:3551` for the API

### 🌐 Staging / Production Mode

For staging or production builds:

```bash
docker compose -f docker-compose-prod.yml up -d --build
```

This will:

* Build optimized images for **Portal** and **API**
* Serve Portal using **Nginx** on port **3550**
* Expose the API on port **3551**
* Use `.env.prod` for configuration

> **Tip:** You can add a volume mapping in `docker-compose-prod.yml` for `./upload/images:/app/upload/images` to persist user uploads between rebuilds.

---

## 🖥 How to Run the App Using npm (Without Docker)

1. **Start the database:**

   ```bash
   docker compose up --build stmp-db
   ```

2. **Install dependencies:**

   * Navigate into **Api** folder → `npm i`
   * Navigate into **Portal** folder → `npm i`

3. **Configure environment variables:**

   * In **Portal** folder: copy `.env-example` → `.env`
   * In **Api** folder: copy `.env.npm` → `.env`

4. **Run Portal (in its own terminal):**

   ```bash
   npm run dev
   ```

5. **Run API (in its own terminal):**

   ```bash
   npm run start
   ```

   * Or use `npm run dev` to enable nodemon for hot reload.

---

## 🗂 Project Structure (Important Folders)

```
StMichelWebsite/
├── Api/               # Node.js backend (Express + Prisma)
├── Portal/            # Vite-based frontend served with Nginx in prod
├── Front-end/         # Next.js frontend
├── shared-lib/        # Shared TypeScript library used by API and Portal
├── upload/images/     # User uploads (persist with volume in prod)
├── docker-compose-dev.yml
├── docker-compose-prod.yml
```

---

## 🧰 Useful Commands

* **Stop all containers:**

  ```bash
  docker compose down
  ```

* **Rebuild everything (prod):**

  ```bash
  docker compose -f docker-compose-prod.yml up -d --build
  ```

* **View logs:**

  ```bash
  docker compose logs -f
  ```

* **Rebuild a single service (e.g. API):**

  ```bash
  docker compose -f docker-compose-prod.yml up -d --build api
  ```

---