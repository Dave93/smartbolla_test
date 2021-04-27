import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/MainLayout";
import Project from "../../components/Project/Project.desktop";

function Projects({ mainLayoutSocial, projects }) {
  const { t } = useTranslation("common");

  const commonLang = {
    projects: t("projects"),
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };
  return (
    <MainLayout
      title={t("title")}
      commonLang={commonLang}
      footerLang={footerLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      {<Project project={projects} />}
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
      projects,
    },
  };
}

export default Projects;
