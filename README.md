# 🚀 Capstone-2026

<a id="readme-top"></a>
<!--
*** Read documentation carefully before launching application
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

![alt text](image-4.png)
<h3 align="center">Client Satisfaction Tool</h3>

  <p align="center">
    A reusable feedback service designed for BC Public Service applications.

The Client Satisfaction Tool (CST) allows application teams to collect meaningful feedback from users at specific points in their application. Teams can create and customize feedback forms, embed the feedback widget into their applications, and view the resulting data through a dashboard.
    <br />
    <a href="https://github.com/bcgov/Capstone-2026"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/bcgov/Capstone-2026">View Demo</a>
    &middot;
    <a href="https://github.com/bcgov/Capstone-2026/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/bcgov/Capstone-2026/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Many government applications need feedback from their users, but implementing and managing a feedback system independently for every application can be time-consuming and inconsistent.

The Client Satisfaction Tool provides a common, reusable feedback service that application teams can integrate into their applications.

#### The CST consists of two main components:
```
Feedback Widget — A customizable feedback form that can be triggered within an application.
```
```
Dashboard — An authenticated interface where administrators and product owners can create, manage, and view their feedback forms. 
```
The project was developed as a 2026 capstone project in partnership with the BC Public Service.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Vite][Vite]][Vite-url]
* [![NestJS][NestJS]][NestJS-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![PostGIS][PostGIS]][PostGIS-url]
* [![Docker][Docker]][Docker-url]
* [![Caddy][Caddy]][Caddy-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

In the root folder copy .env.template and rename .env then add the database password to var DATABASE_URL.

Run docker compose up and Compose will start and run your entire app.
```
Docker compose up
```
In the backend folder, migrate the schema to be up to date with database 

npx prisma migrate reset

### Prerequisites

How to install what you need 

  ```
  npm install 
  ```
In backend folder 
  ```
  npx prisma generate 
  ```

### Installation

There are two options for installation, downloading our entire project or adding our component onto your own project via node packaging. 

To Download the entire project Capslock app:

1. Clone the repo
   ```sh
   git clone https://github.com/bcgov/Capstone-2026.git
   ```
2. Create a .env file in the project root:
   ```sh
    DATABASE_URL=postgresql://postgres:default@database:5432/postgres?schema=public
    METABASE_SECURE_KEY=30840854a96967a37927f4f4cebb54171a31792f1ce6fb52159e0db2e8858045
    
    METABASE_SITE_URL=https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca
   ```
   And one in the backend folder 
   ```sh
    DATABASE_URL=postgresql://postgres:default@localhost:5432/postgres?schema=public
    METABASE_SECURE_KEY=30840854a96967a37927f4f4cebb54171a31792f1ce6fb52159e0db2e8858045
    METABASE_SITE_URL=https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca
   ```
3. Start Docker Desktop.
4. Build and start the containers 
   ```sh
   docker compose up --build
   ```
5. Get the updated database and open studio editor
    ```
    npx prisma db pull

    npx prisma studio
    ```
6. Access the application:
   ```sh
   Frontend: http://localhost:5173
   ```

   ```sh
   Backend API: http://localhost:3000
   ```

## Using the Feedback Widget

The Client Satisfaction Tool feedback widget is maintained in a separate repository so that it can be integrated into other applications independently of the CST dashboard and backend.

https://github.com/bcgov/cst-feedback-pkg 

To use the feedback widget in your application:

1. Clone the cst-feedback-pkg repository.
2. Follow the setup and installation instructions in the widget repository's README.md.
3. Integrate the widget into your application following the instructions provided in the widget repository.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

The CST is an interactive feedback modal that can be triggered at a specific point in a user's journey through a BC Government website, giving them the opportunity to provide feedback or dismiss the prompt.

![alt text](image-5.png)

When the feedback form opens, users are presented with questions retrieved from the database. Since the CST is designed to be reusable, product owners and other authorized users can create and customize questions through the dashboard interface.

![alt text](image-6.png)

Once user fills in the form they are free to submit or cancel 

![alt text](image-2.png)

After submitting the form, users receive a confirmation message indicating whether their submission was successful. A unique submission ID is also provided for their records.

![alt text](image-7.png)

Dashboard is only available to logged in users

![alt text](image-10.png)

When logged in product owners and other authorized users may make new forms and view existing created forms. 

![alt text](image-8.png)

Product owners and other authorized users can select question type and customize heavily to gather relevant data. 

![alt text](image-11.png)

Each saved form is assigned a unique form ID and associated with the product owner who created it. Users must sign in to the dashboard so that they can securely access and manage only the forms they have permission to view.

![alt text](image-12.png)

Product owners can view and manage their forms through the dashboard, including editing existing forms.

![alt text](image-13.png)

Edited forms that are out of date will show as inactive 

![alt text](image-14.png)

Each user owns their own forms and can only see the ones they have permission to view. This is our admin form view 

![alt text](image-16.png)

Once a user logs out they are booted from dashboard view back to test app preventing unauthorized access. 

![alt text](image-15.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
The core functionality planned for the project has been implemented:

- [X] Feedback prompt
- [X] Dynamic feedback forms
- [X] Database-backed questions
- [X] Multiple question types
- [X] Feedback submission
- [X] Submission confirmation
- [X] Dashboard
- [X] Form creation and editing
- [X] User-specific form access
- [X] Aggregated feedback data 

See the [open issues](https://github.com/bcgov/Capstone-2026/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/bcgov/Capstone-2026/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bcgov/Capstone-2026" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Sponsor

This project was developed in partnership with the BC Public Service.

We would like to thank our sponsors and mentors for their guidance, feedback, and support throughout the development of the Client Satisfaction Tool.

<!-- CONTACT -->
## Contact

#### Ebba de Groot - Frontend Lead
- degrootebba@gmail.com
- https://www.linkedin.com/in/ebbadegroot

#### Tey Cheng - Backend Lead
- pagnavathtey@gmail.com 
- https://www.linkedin.com/in/pagnavathtey-cheng-2858452b0

#### Maia Grisch - Documentation Lead / Flex Developer
- maiagrisch@outlook.com
- https://www.linkedin.com/in/maia-grisch-b86589294 

Project Link: [https://github.com/bcgov/Capstone-2026](https://github.com/bcgov/Capstone-2026)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []() Thank you to namecheap.com for the amazing free logo <a href> https://www.namecheap.com/
* []() Thank you to BC Public Service and the Ministry of Citizen Services for this exciting oppourtunity

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/bcgov/Capstone-2026.svg?style=for-the-badge
[contributors-url]: https://github.com/bcgov/Capstone-2026/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bcgov/Capstone-2026.svg?style=for-the-badge
[forks-url]: https://github.com/bcgov/Capstone-2026/network/members
[stars-shield]: https://img.shields.io/github/stars/bcgov/Capstone-2026.svg?style=for-the-badge
[stars-url]: https://github.com/bcgov/Capstone-2026/stargazers
[issues-shield]: https://img.shields.io/github/issues/bcgov/Capstone-2026.svg?style=for-the-badge
[issues-url]: https://github.com/bcgov/Capstone-2026/issues
[license-shield]: https://img.shields.io/github/license/bcgov/Capstone-2026.svg?style=for-the-badge
[license-url]: https://github.com/bcgov/Capstone-2026/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/

[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/

[NestJS]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[NestJS-url]: https://nestjs.com/

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[PostGIS]: https://img.shields.io/badge/PostGIS-008000?style=for-the-badge
[PostGIS-url]: https://postgis.net/

[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=dockers&logoColor=white
[Docker-url]: https://www.docker.com/

[Caddy]: https://img.shields.io/badge/Caddy-1F88C0?style=for-the-badge&logo=caddy&logoColor=white
[Caddy-url]: https://caddyserver.com/
