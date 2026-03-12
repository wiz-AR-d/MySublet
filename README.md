# LiveOhana

Finding temporary housing, standard subleasing, and short-term rentals is often a stressful and fragmented experience. Students, young professionals, and digital nomads frequently rely on scattered social media groups or disjointed community boards to find living spaces. However, most of these platforms lack built-in security, streamlined communication, and property verification.

In these informal environments, trust is a major issue, leaving users vulnerable to scams, misrepresentation of properties, and unverified landlords. A centralized platform that provides verification, map-based discovery, and secure messaging is technically complex to build but essential for safety.

## The Challenge
There is no streamlined, dedicated platform for subleasing that:

- Verifies listing authenticity and user identities automatically
- Provides interactive, map-based property discovery
- Maintains secure and reliable communication between hosts and tenants
- Manages high-quality property media seamlessly

Key challenges include:
- Designing a robust identity verification system to filter out fraudulent listings
- Implementing real-time interactive maps with geofencing and dynamic clustering
- Handling complex image optimizations and storage
- Ensuring secure user authentication and data privacy

## The Consequence
Without a robust subleasing platform:
- Renters fall victim to scams and unverified listings
- Searching for short-term housing takes too much time across fragmented groups
- Hosts struggle with unqualified inquiries and disorganized messaging
- Teams lack administrative oversight over fraudulent activity
- Users drop off due to poor UI/UX for property discovery.

💡 **The Solution**
We designed LiveOhana, a comprehensive real estate and subleasing application that connects verified listers with prospective tenants in a secure, intuitive, and map-centric environment.

Key features of our solution:

- **Interactive Property Discovery**: Instead of just text lists, the system integrates a fully dynamic Leaflet map, enabling users to visually search neighborhoods, filter listings, and preview properties instantly.
- **Robust Identity Verification**: Users can complete detailed verification processes (overseen by dedicated admin panels), ensuring that hosts and prospective tenants can trust one another before committing.
- **Centralized Dashboard**: A unified management hub for users to track their saved listings, monitor property reach, update profile settings, and securely communicate.
- **Cloud-Native Media Storage**: Integrated with Cloudinary to handle dynamic image uploads, storage, and optimization for fast-loading property graphics.

🌟 **Features That Stand Out**
Beyond core listing capabilities, this project includes several auxiliary systems that elevate it from a simple board to a fully-fledged housing platform:

- **Integrated Messaging**: Users can instantly connect with property listers via secure messaging built directly into the app, avoiding the need to share private phone numbers prematurely.
- **Admin Oversight Center**: A dedicated admin verification suite `/admin/verifications` for maintaining platform integrity by manually reviewing applications, identities, and reported properties.
- **Cloudinary Image Upload**: Seamless handling of user-generated property photos, optimized on-the-fly to maintain lighting-fast page loads.

## 🛠 Tech Stack

### Frontend
- **React 19 & Vite**: Lightning-fast UI rendering and modern development building.
- **TailwindCSS**: Rapid, responsive, and modern styling framework.
- **React-Leaflet**: Embedded interactive map engine for geographical listing search and pinning.
- **Zustand**: Lightweight and scalable global state management (e.g., auth, UI states).
- **Lucide-React & Framer Motion**: Beautiful iconography and smooth micro-animations.

### Backend & Services
- **Supabase**: Open-source Firebase alternative providing secure PostgreSQL database management, realtime capabilities, and user authentication.
- **Cloudinary**: High-performance CDN for image upload, processing, and delivery.

## 🗄 Database Schema Structure
The application's persistent layer relies on Supabase's managed serverless Postgres database. The schema is optimized for managing ownership, messaging, and multi-listing geographical data.

### 1. User Table (Managed by Supabase Auth)
Maintains authentication and identities for the platform.
- `id` (UUID, Primary Key)
- `email` (Unique String)
- `password` (Hashed via Supabase Auth)
- `profile_data` (JSON/Relation)

**Relations:**
- `listings` (One-to-Many: Properties owned by the user)
- `saved_listings` (Many-to-Many: Favorite properties)

### 2. Listing Table
Represents a physical property or sublease listing.
- `id` (UUID, Primary Key)
- `title` & `description` (Text)
- `price` (Numeric)
- `location_coordinates` (Geometry/Lat-Long)
- `images` (Array of Strings pointing to Cloudinary)
- `ownerId` (Foreign Key -> User)

**Relations:**
- `messages` (One-to-Many -> ChatMessage)

### 3. Verification Table
Tracks background or identity verification status for secure subleasing.
- `id` (UUID, Primary Key)
- `userId` (Foreign Key -> User)
- `status` (Enum: pending, approved, rejected)
- `documents` (Encrypted JSON/Links)

### 4. Message Table
Persists the communication history bounding a user and a property lister.
- `id` (UUID, Primary Key)
- `listingId` (Foreign Key -> Listing)
- `senderId` (Foreign Key -> User)
- `receiverId` (Foreign Key -> User)
- `content` (Text)
- `createdAt` (DateTime)
