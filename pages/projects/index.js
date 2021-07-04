import { MainLayout } from "../../components/MainLayout";
import Project from "../../components/Project/Project";
import React, { useState } from "react";
import { projectModal, youtubeModal } from "../index.module.css";
import YouTube from "react-youtube";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Projects({ mainLayoutSocial, projects }) {
  const { t } = useTranslation("projectsPage");
  const [currentProject, setCurrentProject] = useState(null);
  const [youtubeId, setYoutubeId] = useState(null);

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };

  let youtubeOptions = {
    height: "60%",
    width: "90%",
  };

  if (process.browser) {
    youtubeOptions.width = parseInt(window.innerWidth * 0.7, 0);
    youtubeOptions.height = parseInt(window.innerHeight * 0.5, 0);
  }

  return (
    <MainLayout
      title={t("projects")}
      commonLang={commonLang}
      footerLang={footerLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className="p-14">
        <img />
      </div>

      <div className="p-14">
        <img src="/newRealizationStep.png" alt="newRealizationStep" />
      </div>
      {projects.map((project) => (
        <div key={project.ID}>
          <Project
            project={project}
            onShowYoutube={(id) => {
              setYoutubeId(id);
            }}
          />
        </div>
      ))}
      <div className="p-14">
        <img src="/realizationStep1.png" alt="realizationStep" />
      </div>
      {currentProject && (
        <div className="z-[9999] text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay  w-full h-full bg-gray-900 opacity-50 z-[10000]"></div>

          <div className="modal-container absolute w-full md:max-w-md mx-auto rounded shadow-lg  z-[20000]">
            <div
              onClick={() => {
                setCurrentProject(null);
              }}
              className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            >
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
              <span className="text-sm"></span>
            </div>

            <div className={`${projectModal} text-left`}>
              {currentProject.PREVIEW_TEXT}
            </div>
          </div>
        </div>
      )}
      {youtubeId && (
        <div className="z-[9999] text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay  w-full h-full bg-gray-900 opacity-50 z-[10000]"></div>

          <div className="modal-container w-full mx-auto rounded z-[20000] absolute">
            <div
              onClick={() => {
                setYoutubeId(null);
              }}
              className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            >
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
              <span className="text-sm"></span>
            </div>

            <div
              className={`${youtubeModal} mx-auto overflow-hidden text-left`}
            >
              <YouTube
                videoId={youtubeId}
                opts={youtubeOptions}
                className="m-auto"
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }) {
  const socials = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "social.links",
      data: {
        locale: locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  const resProjects = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.projects.list",
      data: {
        locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: mainLayoutSocial } = await socials.json();
  let { data: projects } = await resProjects.json();

  return {
    props: {
      mainLayoutSocial,
      ...(await serverSideTranslations(locale, ["projectsPage"])),
      projects,
    },
  };
}

export default Projects;
