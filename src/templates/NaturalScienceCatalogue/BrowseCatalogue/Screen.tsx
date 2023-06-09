import styled from "styled-components";
import { useAsyncRequest } from "../../../services/useAsyncRequest";
import { mncnArtifactService } from "../../../services";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { Plus } from "styled-icons/bootstrap";
import { MncnArtifact } from "../../../services/mncnArtifact.model";
import { useState } from "react";
import CheckBoxInput from "../../../components/Forms/CheckBoxInput";
import { EmptyCard } from "../../TemplateDashboard/components/ActivityCard";
import ArtifactCard from "../components/ArtifactCard";
import SearchBar from "../../../components/Forms/SearchBar";

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100% !important;
  height: 100%;
  width: 100%;
  margin-top: 1rem;
  border-top: solid 1px #D5DBDB;
`;

const GridFilters = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.75em;
  padding-top: 1.25em;
  border-right: solid 1px #D5DBDB;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 170px;
  max-width: 500px;
  background-color: ${props => props.theme.cardBackground};
`;

const GridFilterHeader = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  font-weight: bold;
  width: 100%;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.contentFont};
`;

const GridFilterOption = styled.div`
  margin-top: 2px;
  border-top: none;
`;

const ActivityCardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  -moz-box-pack: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: ${props => props.theme.selectArtworkChoicesBackground};
`;

interface NewActivityButtonProps {
  disabled?: boolean;
}
const NewActivityButton = styled.div<NewActivityButtonProps>`
  width: 80%;
  max-width: 13em;
  height: 48px;
  background-color: ${props => `hsl(10, 80%, ${props.theme.textReadableLuminosity}%)`};
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  opacity: ${props => props.disabled ? 0.55 : 1};

  &:hover {
    ${props => !props.disabled && `box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;`}
  }
`;

const NewActivityIcon = styled(Plus)`
  color: white;
  height: 42px;
  width: 42px;
  margin-left: 7px;
`;

const NewActivityText = styled.span`
  color: white;
  font-weight: bold;
  font-family: ${props => props.theme.contentFont};
  font-size: 0.875rem;
  margin-left: 1.25em;
`;

const VerticalSeparator = styled.div`
  height: 0.1em;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 2px 0px;
  margin: 1em 0;
`;

export const MncnCatalogueBrowsingScreen = (): JSX.Element => {

  const fetchMncnArtifacts = async () => {
    return mncnArtifactService.fetchArtifacts();
  };

  const [fetchMncnArtifactsRequest] = useAsyncRequest(fetchMncnArtifacts, []);

  if (fetchMncnArtifactsRequest.kind !== 'success' || fetchMncnArtifactsRequest.kind !== 'success') {
    return <LoadingOverlay message='Fetching MNCN Catalogue' />;
  }

  if (fetchMncnArtifactsRequest.result.kind === 'ok') {
    return (
      <MncnCatalogueBrowsingScreenView
        artifacts={fetchMncnArtifactsRequest.result.data}
      />
    );
  }
  else {
    return (
      <>Could not fetch collection artifacts</>
    );
  }
};


export interface MncnCatalogueBrowsingScreenViewProps {
  /** Artifacts list to browse through. */
  artifacts: MncnArtifact[];
}

export const MncnCatalogueBrowsingScreenView = (props: MncnCatalogueBrowsingScreenViewProps): JSX.Element => {

  const { artifacts } = props;

  const navigate = useNavigate();

  const [displayTags, setDisplayTags] = useState<Map<string, boolean>>(() => {
    const tagsMap = new Map<string, boolean>();
    for (let art of artifacts) {
      for (let tag of art.tags ?? []) {
        if (!tagsMap.has(tag)) {
          tagsMap.set(tag, false);
        }
      }
    }
    return tagsMap;
  });

  const [search, setSearch] = useState<string | undefined>(undefined);

  const renderActivityTagsFilters = () => {
    const elems: JSX.Element[] = [];
    let it = displayTags.entries();
    let current = it.next();
    while (current && !current.done) {
      const tag = current.value[0];
      elems.push((
        <GridFilterOption key={current.value[0]}>
          <CheckBoxInput
            labelText={tag}
            boxSize='15px'
            onCheckedChange={() => { }}
            checked={displayTags.get(tag)}
          />
        </GridFilterOption>)
      );
      current = it.next();
    }
    return elems;
  };

  const shouldDisplay = (artifact: MncnArtifact) => {
    let hasAllTags = true;
    let it = displayTags.entries();
    let current = it.next();
    while (current && !current.done) {
      if (current.value[1]) {
        hasAllTags = (artifact.tags?.some(elem => elem === current.value[0]) ?? false);
        if (!hasAllTags) break;
      }
      current = it.next();
    }

    let matchesSearch =
      search === undefined ||
      artifact.title.toLowerCase().includes(search.toLowerCase()) ||
      artifact.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && hasAllTags;
  };

  const handleSearchPerformed = (searchText: string) => {
    setSearch(searchText);
  };

  return (
    <>
      <GridContainer>
        <GridFilters>
          <SearchBar
            onSearchPerformed={handleSearchPerformed}
            placeholder="Busca por título o descripción..."
          />
          <VerticalSeparator />
          <NewActivityButton
            title='Esta funcionalidad no se encuentra disponible para esta colección de artefactos.'
            disabled
            onClick={() => { }}
          >
            <NewActivityIcon />
            <NewActivityText>
              Nuevo Artefacto
            </NewActivityText>
          </NewActivityButton>
          <GridFilterHeader>Etiquetas</GridFilterHeader>
          {renderActivityTagsFilters()}
          <GridFilterOption key={'sample'} title='Etiqueta las obras de esta colección para tener acceso a filtros.'>
            <CheckBoxInput
              labelText={'Todas'}
              boxSize='15px'
              onCheckedChange={() => { }}
              checked={true}
            />
          </GridFilterOption>
        </GridFilters>
        <ActivityCardGrid>
          {artifacts.flatMap(artifact => {
            if (shouldDisplay(artifact)) {
              return (
                <ArtifactCard
                  key={artifact._id}
                  artifactData={artifact}
                  onOpenClicked={() => navigate(`../artifact/${artifact._id}`)}
                  onEditClicked={() => { }}
                  onDeleteClicked={() => { }}
                />
              );
            }
          })}
          {[...Array(10)].map(i => <EmptyCard key={i} />) /* Hacky but does the trick */}
        </ActivityCardGrid>
      </GridContainer>
    </>
  );
};