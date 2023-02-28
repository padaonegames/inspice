import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StepDescription } from "../../../../components/Forms/Cards/cardStyles";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import { StepRoot } from "../../components/generalStyles";

interface LinkTextProps {
  to: string;
  title?: string;
  children?: React.ReactNode;
} // LinkTextProps

export const LinkText = (props: LinkTextProps) => {
  const { to, children, title } = props;

  return (
    <Link to={to || ""} title={title || ""}>
      {children}
    </Link>
  );
}; // LinkText

export const GeneralInformationStep = (): JSX.Element => {
  const { t } = useTranslation("gamGame");

  return (
    <StepRoot>
      <StepTitleCard stepTitle={t("basicInformation")}>
        <Trans
          t={t}
          i18nKey="welcomeToGamGame"
          components={{
            text: <StepDescription />,
            br: <br />,
            createStoriesLink: <LinkText to="../stories/create" />,
            collectionLink: <LinkText to="../collection" />,
            myStoriesLink: <LinkText to="../my-stories" />,
          }}
        />
      </StepTitleCard>
    </StepRoot>
  );
};

export default GeneralInformationStep;
