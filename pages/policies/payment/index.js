import { MainLayout } from "../../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Payment({ mainLayoutSocial }) {
  const { t } = useTranslation("common");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies"),
  };
  return (
    <MainLayout
      title="Payment Policy"
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className={`${isMobile ? "col-10 m-auto pb-20" : "mt-4"}`}>
        <h4>Payment Policy</h4>
        <div>
          <p>
            This Payment Policy (the „Agreement“) is an agreement between you or
            the entity that you represent („Buyer“) and "SmartBolla Systems
            Technology" LLC („Seller“).
          </p>

          <p>
            The Buyer and The Seller are herein referred to individually as a
            "Party“ and collectively as "Parties“ have entered into the
            Agreement:
          </p>

          <p>
            "Profit Participation" represent the right to dividends of the
            "SmartBolla Systems Technology" LLC.
          </p>

          <p>The Buyer acknowledges, understands, and agrees that:</p>

          <p>
            (I) The Buyer reads the Agreement carefully and in its entirety. The
            Buyer shall not buy "Profit Partication" if any of the risks
            provided in the Agreement.
          </p>

          <p>
            (II) The Buyer is subject to and bound by this Agreement by virtue
            of the Buyer's purchase of "Profit Participation".
          </p>

          <p>
            (III) The Company does not have any obligation to recover any
            "Profit Participation". The Purchases of SmartBolla Tokens are
            non-refundable. The Buyer may lose all paid amounts.
          </p>

          <p>
            (IV) The Buyer does not hold any claims against the Company for any
            losses or any special, incidental, or consequential damages arising
            from, or in any way connected, to the sale of "Profit
            Participation", including losses associated with the risks set in
            the Agreement.
          </p>

          <p>
            (V) The Ownership of "Profit Participation" carries no rights,
            express or implied, other than the right to use such Tokens as a
            means to enable usage of the interaction with the Platform.
          </p>

          <p>
            (VI) "Profit Participation" do not represent any ownership right,
            share or security or equivalent rights, shares, participate in the
            management, intellectual property rights, or any other form of
            participation. Tokens are during the entry into force of the
            Agreement not a cryptocurrency, security, commodity, or any other
            kind of ﬁnancial instrument.
          </p>

          <p>
            (IX) The Buyer bears sole responsibility for losing Buyer’s login
            data to the smartbolla.com account.
          </p>

          <p>
            <strong>The subject of the Agreement.</strong>
          </p>

          <p>
            (I)In accordance with this agreement, the “Buyer” has agreed that
            the "Seller" undertakes to transfer, and the "Buyer" undertakes to
            accept and complete the fund’s transfer in order to acquire the
            "Profit Participation" of the company.
          </p>

          <p>
            (II)The “Seller” guarantees that the "Profit Participation"
            specified in this “Agreement” belong to him on the right of
            ownership, they are not seized, they are not pledged, and not
            encumbered with other rights of third parties.
          </p>
          <p>
            (III)The buyer receives dividends after the launch of all projects
            exactly after one year.
          </p>

          <p>
            (IV)The "Buyer" will receive dividends in his personal account
            created by payment gateway systems integrated into the "Paycent"
            payment system.
          </p>

          <p>
            (V)The “Buyer” agrees to transfer funds to the bank credentials
            specified by the “Seller”;
          </p>

          <p>
            (VI)The "Buyer" hereby confirms his consent that the "Seller" has
            the right not to disclose information about the use of the invested
            funds.{" "}
          </p>

          <p>
            (VII)The “Buyer” hereby confirms his consent that the “Seller” has
            the right not to disclose information about the funds movement.
          </p>

          <p>
            (VIII)The “Buyer” confirms that he has received "Profit
            Participation" of the "Seller" in exchange for full payment of the
            purchase.{" "}
          </p>

          <p>
            (IX)Refuse to execute the "Agreement" or terminate the "Agreement"
            if the "Buyer" in violation of the "Agreement" refuses to accept
            and/or pay for possession of the "Profit Participation".
          </p>

          <p>
            (X)Refuse to execute the "Agreement" if the "Company" refuses to
            transfer the sold "Profit Participation" to the "Buyer".{" "}
          </p>

          <p>
            (XI)The "Seller" may amend this Agreement at any time by posting the
            amended terms on its Website.
          </p>

          <p>
            <strong>Price and payment procedure.</strong>
          </p>

          <p>
            (I)In accordance with the agreement, the cost of the "Profit
            Participation" starts with 100 (one hundred) US dollars, which is
            equal to 0.00001%.
          </p>

          <p>
            (II)Method of payment under the "Agreement": transfer by the "Buyer"
            of monetary funds in US dollars, UAE dirhams to the bank credentials
            of the "Seller". In this case, the obligations of the "Buyer" in
            terms of payment under the "Agreement" are considered fulfilled from
            the date of transfer or another type of transfer of funds from the
            "Buyer" to the bank credentials of the "Seller".
          </p>

          <p>
            (III)The "Profit Participation" can be returned to the "Seller" by
            mutual agreement of the "Parties", as well as unilaterally at the
            written request of one of the "Parties" on the grounds provided for
            by law, as well as in case of violation of the requirements
            established and specified in the rules of this "Agreement".
          </p>

          <p>
            (IV)Additionally, The "Buyer” while accepting all of the terms and
            conditions arising under this agreement may be requested to share
            the photo and additional information excluding sensitive personal
            information. The "Seller" remains the right to reject and cancel any
            agreement with a counterpart party if the "Seller” has grounds to
            believe that the "Buyer” has breached any of these terms and
            conditions, acted fraudulently or illegally, or on other reasonable
            grounds and will have no liability for any loss or damage arising
            from such rejection. The "Seller" will, at all times, have the right
            to immediately terminate this Agreement for convenience without
            providing any reason for such termination.
          </p>

          <p>
            (V)The "Parties" are released from liability for full or partial
            failure to fulfill their obligations under the "Agreement" in the
            event that failure to fulfill obligations was the result of force
            majeure actions.{" "}
          </p>

          <p>
            (VI)The "Party" that cannot fulfill the obligations under the
            "Agreement" must promptly, but no later than the Force majeure
            notice period of 5 calendar days after the occurrence of force
            majeure circumstances, notify the other "Party" in writing, with the
            provision of supporting documents issued by the competent
            authorities.{" "}
          </p>

          <p>
            (VII)The "Parties" acknowledge that the insolvency of the "Parties"
            is not a force majeure circumstance.
          </p>

          <p>
            <strong>Use of services and personal information.</strong>
          </p>

          <p>
            (I)Subject to the terms and conditions set forth herein, The
            "Seller" grants “The Buyer” a non-exclusive, non-transferable,
            limited right to access, use and browse this Website and the
            materials thereon. You agree not to interrupt or attempt to
            interrupt the operation of the Website in any way.
          </p>

          <p>
            (II)Services and products include "SmartBolla Systems Technology"
            LLC (to be found at https://www.smartbolla.com.) The Services may
            also be provided through the third party websites and/or
            applications. The "Seller" Services enable you to buy the "Profit
            Participation" of the company through the web-application. The
            "Seller" takes the responsibility to provide the “Buyer” latest
            upgrades upon the activity of the company.
          </p>

          <p>
            (III)The "Seller" takes the responsibility to ensure the
            availability of the information and content in the social media
            platforms.
          </p>

          <p>
            (IV)Under this Agreement, the "Seller" permits “The Buyer” access
            and usage to the personal cabinet on the https://www.smartbolla.com
            web-site for personal use and allows the printing of a copy of the
            information displayed in all media and information channels related
            to the "Seller".
          </p>

          <p>
            (V)Photos, names, and additional information of “The Buyer”
            excluding sensitive personal information can, and will be published
            on https://www.smartbolla.com one of the parts of the unique
            algorithm available at https://www.smartbolla.com and, if needed -
            social media channels related to and authorized by the "Seller".
          </p>

          <p>
            (VIII)The "Seller" is not involved in any transactions between “The
            Buyer” and any other third-party in terms of payment issues or
            transferring the "Profit Participation" as the proportions could be
            sold only to the "Seller".
          </p>

          <p>
            (IX)In case of dispute with the "Seller", Buyer agrees to release
            and hereby release the "Seller" (directors, founders, co-founders,
            subsidiaries, employees, lawyers, content providers and service
            providers) from claims, demands and damages of every kind and
            nature, known and unknown, suspected and unsuspected, disclosed and
            undisclosed.
          </p>
          <Link href={"/policies"}>
            <a>
              <FontAwesomeIcon class="w-5" icon={faArrowLeft} />
            </a>
          </Link>
        </div>
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
