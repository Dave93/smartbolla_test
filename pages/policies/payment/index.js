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
        <h4>Payment Policy of SMART BOLLA DMCC</h4>
        <div>
          <p>
            This Payment Policy (the „Agreement“) is an agreement between you or
            the entity that you represent („Buyer“) and "Smart Bolla" DMCC
            (registry code: DMCC189165, registered under the laws of Dubai, UAE)
            („Seller“).
          </p>

          <p>
            The Buyer and The Seller are herein referred to individually as a
            "Party“ and collectively as "Parties“ have entered into the
            Agreement:
          </p>

          <p>
            Tokens represent the right to dividends of the "Smart Bolla" DMCC.
          </p>

          <p>The Buyer acknowledges, understands, and agrees that:</p>

          <p>
            (I) The Buyer reads the Agreement carefully and in its entirety. The
            Buyer shall not buy SmartBolla Token if any of the risks provided in
            the Agreement.
          </p>

          <p>
            (II) The Buyer is subject to and bound by this Agreement by virtue
            of the Buyer's purchase of Tokens.
          </p>

          <p>
            (III) The Company does not have any obligation to recover any
            SmartBolla Tokens. The Purchases of SmartBolla Tokens are
            non-refundable. The Buyer may lose all paid amounts.
          </p>

          <p>
            (IV) The Buyer does not hold any claims against the Company for any
            losses or any special, incidental, or consequential damages arising
            from, or in any way connected, to the sale of SmartBolla Token,
            including losses associated with the risks set in the Agreement.
          </p>

          <p>
            (V) The Ownership of Tokens carries no rights, express or implied,
            other than the right to use such Tokens as a means to enable usage
            of the interaction with the Platform.
          </p>

          <p>
            (VI) Tokens do not represent any ownership right, share or security
            or equivalent rights, shares, participate in the management,
            intellectual property rights, or any other form of participation.
            Tokens are during the entry into force of the Agreement not a
            cryptocurrency, security, commodity, or any other kind of ﬁnancial
            instrument.
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
            Tokens of the company.
          </p>

          <p>
            (II)The “Seller” guarantees that the Tokens specified in this
            “Agreement” belong to him on the right of ownership, they are not
            seized, they are not pledged, and not encumbered with other rights
            of third parties.
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
            (VIII)The “Buyer” confirms that he has received Tokens of the
            "Seller" in exchange for full payment of the purchase.{" "}
          </p>

          <p>
            (IX)Refuse to execute the "Agreement" or terminate the "Agreement"
            if the "Buyer" in violation of the "Agreement" refuses to accept
            and/or pay for possession of the Tokens.
          </p>

          <p>
            (X)Refuse to execute the "Agreement" if the "Company" refuses to
            transfer the sold Tokens to the "Buyer".{" "}
          </p>

          <p>
            (XI)The "Seller" may amend this Agreement at any time by posting the
            amended terms on its Website.
          </p>

          <p>
            <strong>Price and payment procedure.</strong>
          </p>

          <p>
            (I)In accordance with the agreement, the cost of 1 unit of the
            Tokens is 100 (one hundred) US dollars, which is equal to 0.00001%.
          </p>

          <p>
            (II)Method of payment under the "Agreement": transfer by the "Buyer"
            of monetary funds in US dollars, UAE dirhams, and British pounds
            sterling to the bank credentials of the "Seller". In this case, the
            obligations of the "Buyer" in terms of payment under the "Agreement"
            are considered fulfilled from the date of transfer or another type
            of transfer of funds from the "Buyer" to the bank credentials of the
            "Seller".
          </p>

          <p>
            (III)Tokens can be returned to the "Seller" by mutual agreement of
            the "Parties", as well as unilaterally at the written request of one
            of the "Parties" on the grounds provided for by law, as well as in
            case of violation of the requirements established and specified in
            the rules of this "Agreement".
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
            notice period of calendar days after the occurrence of force majeure
            circumstances, notify the other "Party" in writing, with the
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
            (II)Services and products include "Smart Bolla" DMCC (to be found at
            https://www.smartbolla.com.) The Services may also be provided
            through third party websites and/or applications. The "Seller"
            Services enable you to buy Tokens of the company through the
            web-application. The "Seller" takes the responsibility to provide
            the “Buyer” latest upgrades upon the activity of the company.
          </p>

          <p>
            (III)The "Seller" takes the responsibility to ensure the
            availability of the information and content in the social media
            platforms.
          </p>

          <p>
            (IV)Under this Agreement, the "Seller" permits “The Buyer” access
            and usepersonal cabinet on the https://www.smartbolla.com web-site
            for personal use and allows the printing of a copy of the
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
            (VI)The "Seller" does not guarantee that the prices of Tokens, terms
            and conditions of the agreement and availability of the possibility
            will not change during the further action taken by the "Seller".
          </p>

          <p>
            (VII) This Agreement is available in English, Arabic, Russian,
            French, Spanish, Chinese and Uzbek. In the event of any
            inconsistency between the text versions of this Agreement and
            English versions of this Agreement, the English version shall
            prevail.
          </p>

          <p>
            (VIII)The "Seller" is not involved in any transactions between “The
            Buyer” and any other third-party in terms of payment issues or
            transferring Tokens as the proportions could be sold only to the
            "Seller".
          </p>

          <p>
            (IX)In case of dispute with the "Seller", Buyer agrees to release
            and hereby release the "Seller" (directors, founders, co-founders,
            subsidiaries, employees, lawyers, content providers and service
            providers) from claims, demands and damages of every kind and
            nature, known and unknown, suspected and unsuspected, disclosed and
            undisclosed.
          </p>

          <p>
            (X)Any controversy or claim arising out of or relating to this
            Agreement or the Services will be settled by binding arbitration in
            accordance with the UAE Commercial laws.
          </p>

          <p>
            (XI)This Agreement shall be governed by the laws of the United Arab
            Emirates without regard to its conflict of law provisions. Failure
            of the "Seller" to exercise or enforce any right or provision of the
            Agreement will not be deemed to be a waiver of such right or
            provision.
          </p>

          <p>(XII)The arbitration must be conducted in Dubai, UAE.</p>

          <p>
            <strong>Death</strong>
          </p>

          <p>
            (I)If The "Buyer” is deceased, Tokens rights will be transferred
            according to the internal legislation of the citizenship state of
            “the Buyer”.
          </p>
          <Link href={"/policies"}>
            <a>
              <FontAwesomeIcon icon={faArrowLeft} />
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
