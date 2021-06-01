import { MainLayout } from "../../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Terms({ mainLayoutSocial }) {
  const { t } = useTranslation("common");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    policies: t("policies"),
  };
  return (
    <MainLayout
      title="Terms of service"
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className={`${isMobile ? "col-10 m-auto pb-20" : "mt-4"}`}>
        <p>SMART BOLLA DMCC</p>
        <p>
          Dubai, United Arab Emirates, Mazaya Business Avenue; Diamond Business
          Center; BB1 Tower, Level 18, Unit №1801-1808 PO BOX 26734, +971
          43699090.
        </p>
        <p style={{ textAlign: "center" }}>
          <strong>Terms of Service</strong>
        </p>
        <p>
          These terms and conditions ("Agreement") set forth the general terms
          and conditions of your use of the smartbolla.com website ("Website" or
          "Service") and any of its related products and services (collectively,
          "Services"). This Agreement is legally binding between you ("User",
          "you" or "your") and this Website operator ("Operator", "we", "us" or
          "our"). By accessing and using the Website and Services, you
          acknowledge that you have read, understood, and agree to be bound by
          the terms of this Agreement. If you are entering into this Agreement
          on behalf of a business or other legal entity, you represent that you
          have the authority to bind such entity to this Agreement, in which
          case the terms "User", "you" or "your" shall refer to such entity. If
          you do not have such authority, or if you do not agree with the terms
          of this Agreement, you must not accept this Agreement and may not
          access and use the Website and Services. You acknowledge that this
          Agreement is a contract between you and the Operator, even though it
          is electronic and is not physically signed by you, and it governs your
          use of the Website and Services. This terms and conditions policy was
          created with the help of the terms and conditions generator.
        </p>
        <p>Accounts and membership</p>
        <p>
          You must be at least 18 years of age to use the Website and Services.
          By using the Website and Services and by agreeing to this Agreement
          you warrant and represent that you are at least 18 years of age. If
          you create an account on the Website, you are responsible for
          maintaining the security of your account and you are fully responsible
          for all activities that occur under the account and any other actions
          taken in connection with it. We may monitor and review new accounts
          before you may sign in and start using the Services. Providing false
          contact information of any kind may result in the termination of your
          account. You must immediately notify us of any unauthorized uses of
          your account or any other breaches of security. We will not be liable
          for any acts or omissions by you, including any damages of any kind
          incurred as a result of such acts or omissions. We may suspend,
          disable, or delete your account (or any part thereof) if we determine
          that you have violated any provision of this Agreement or that your
          conduct or content would tend to damage our reputation and goodwill.
          If we delete your account for the foregoing reasons, you may not
          re-register for our Services. We may block your email address and
          Internet protocol address to prevent further registration.
        </p>
        <p>Links to other resources</p>
        <p>
          Although the Website and Services may link to other resources (such as
          websites, mobile applications, etc.), we are not, directly or
          indirectly, implying any approval, association, sponsorship,
          endorsement, or affiliation with any linked resource, unless
          specifically stated herein. We are not responsible for examining or
          evaluating, and we do not warrant the offerings of, any businesses or
          individuals or the content of their resources. We do not assume any
          responsibility or liability for the actions, products, services, and
          content of any other third parties. You should carefully review the
          legal statements and other conditions of use of any resource which you
          access through a link on the Website and Services. Your linking to any
          other off-site resources is at your own risk.
        </p>
        <p>Prohibited uses</p>
        <p>
          In addition to other terms as set forth in the Agreement, you are
          prohibited from using the Website and Services or Content: (a) for any
          unlawful purpose; (b) to solicit others to perform or participate in
          any unlawful acts; (c) to violate any international, federal,
          provincial or state regulations, rules, laws, or local ordinances; (d)
          to infringe upon or violate our intellectual property rights or the
          intellectual property rights of others; (e) to harass, abuse, insult,
          harm, defame, slander, disparage, intimidate, or discriminate based on
          gender, sexual orientation, religion, ethnicity, race, age, national
          origin, or disability; (f) to submit false or misleading information;
          (g) to upload or transmit viruses or any other type of malicious code
          that will or may be used in any way that will affect the functionality
          or operation of the Website and Services, third party products and
          services, or the Internet; (h) to spam, phish, pharm, pretext, spider,
          crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to
          interfere with or circumvent the security features of the Website and
          Services, third party products and services, or the Internet. We
          reserve the right to terminate your use of the Website and Services
          for violating any of the prohibited uses.
        </p>
        <p>Intellectual property rights</p>
        <p>
          "Intellectual Property Rights" means all present and future rights
          conferred by statute, common law or equity in or in relation to any
          copyright and related rights, trademarks, designs, patents,
          inventions, goodwill and the right to sue for passing off, rights to
          inventions, rights to use, and all other intellectual property rights,
          in each case whether registered or unregistered and including all
          applications and rights to apply for and be granted, rights to claim
          priority from, such rights and all similar or equivalent rights or
          forms of protection and any other results of intellectual activity
          which subsist or will subsist now or in the future in any part of the
          world. This Agreement does not transfer to you any intellectual
          property owned by the Operator or third parties, and all rights,
          titles, and interests in and to such property will remain (as between
          the parties) solely with the Operator. All trademarks, service marks,
          graphics and logos used in connection with the Website and Services,
          are trademarks or registered trademarks of the Operator or its
          licensors. Other trademarks, service marks, graphics and logos used in
          connection with the Website and Services may be the trademarks of
          other third parties. Your use of the Website and Services grants you
          no right or license to reproduce or otherwise use any of the Operator
          or third party trademarks.
        </p>
        <p>Limitation of liability</p>
        <p>
          To the fullest extent permitted by applicable law, in no event will
          the Operator, its affiliates, directors, officers, employees, agents,
          suppliers or licensors be liable to any person for any indirect,
          incidental, special, punitive, cover or consequential damages
          (including, without limitation, damages for lost profits, revenue,
          sales, goodwill, use of content, impact on business, business
          interruption, loss of anticipated savings, loss of business
          opportunity) however caused, under any theory of liability, including,
          without limitation, contract, tort, warranty, breach of statutory
          duty, negligence or otherwise, even if the liable party has been
          advised as to the possibility of such damages or could have foreseen
          such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of the Operator and its affiliates, officers,
          employees, agents, suppliers and licensors relating to the services
          will be limited to an amount greater of one dollar or any amounts
          actually paid in cash by you to the Operator for the prior one month
          period prior to the first event or occurrence giving rise to such
          liability. The limitations and exclusions also apply if this remedy
          does not fully compensate you for any losses or fails of its essential
          purpose.
        </p>
        <p>Indemnification</p>
        <p>
          You agree to indemnify and hold the Operator and its affiliates,
          directors, officers, employees, agents, suppliers and licensors
          harmless from and against any liabilities, losses, damages or costs,
          including reasonable attorneys' fees, incurred in connection with or
          arising from any third party allegations, claims, actions, disputes,
          or demands asserted against any of them as a result of or relating to
          your Content, your use of the Website and Services or any willful
          misconduct on your part.
        </p>
        <p>Severability</p>
        <p>
          All rights and restrictions contained in this Agreement may be
          exercised and shall be applicable and binding only to the extent that
          they do not violate any applicable laws and are intended to be limited
          to the extent necessary so that they will not render this Agreement
          illegal, invalid or unenforceable. If any provision or portion of any
          provision of this Agreement shall be held to be illegal, invalid or
          unenforceable by a court of competent jurisdiction, it is the
          intention of the parties that the remaining provisions or portions
          thereof shall constitute their agreement with respect to the subject
          matter hereof, and all such remaining provisions or portions thereof
          shall remain in full force and effect.
        </p>
        <p>Dispute resolution</p>
        <p>
          The formation, interpretation, and performance of this Agreement and
          any disputes arising out of it shall be governed by the substantive
          and procedural laws of United Arab Emirates without regard to its
          rules on conflicts or choice of law and, to the extent applicable, the
          laws of United Arab Emirates. The exclusive jurisdiction and venue for
          actions related to the subject matter hereof shall be the courts
          located in United Arab Emirates, and you hereby submit to the personal
          jurisdiction of such courts. You hereby waive any right to a jury
          trial in any proceeding arising out of or related to this Agreement.
          The United Nations Convention on Contracts for the International Sale
          of Goods does not apply to this Agreement.
        </p>
        <p>Changes and amendments</p>
        <p>
          We reserve the right to modify this Agreement or its terms relating to
          the Website and Services at any time, effective upon posting of an
          updated version of this Agreement on the Website. When we do, we will
          post a notification on the main page of the Website. Continued use of
          the Website and Services after any such changes shall constitute your
          consent to such changes.
        </p>
        <p>Acceptance of these terms</p>
        <p>
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Agreement. If you do not agree to abide
          by the terms of this Agreement, you are not authorized to access or
          use the Website and Services.
        </p>
        <p>Contacting us</p>
        <p>
          If you would like to contact us to understand more about this
          Agreement or wish to contact us concerning any matter relating to it,
          you may do so via the contact form.
        </p>
        <Link href={"/policies"}>
          <a>
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
        </Link>
      </div>
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

  let { data: mainLayoutSocial } = await socials.json();

  return {
    props: {
      mainLayoutSocial,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
