import { ArtworkFieldMapping } from "./commonDefinitions";

export interface GetArtworksFilter {
  id?: string; // exact
  ids?: string[]; // multiple artworks
  author?: string; // regex
  date?: string; // exact
  info?: string; // regex
  titleKeywords?: string; // regex
};

export interface GetArtworksOptions {
  pageNumber?: number;
  pageSize?: number;
  sortingField?: string;
  filter?: GetArtworksFilter;
};

const filterRegexField = (ids: string[], fieldName: string) => {
  if (ids.length === 0) return '';
  let res = `FILTER ${ids.length > 1 ? '(' : ''}regex(str(?${fieldName}), "${ids[0]}", "i")`;
  for (let i = 1; i < ids.length; i++) {
    res += ` || regex(str(?${fieldName}), "${ids[i]}", "i")`
  }
  if (ids.length > 1) {
    res += ')';
  }
  return res;
};

const unfoldFieldQuery = (fieldName: string, mappingSequence: string[], nextTerm: string = 'id'): string => {
  if (mappingSequence.length === 1) {
    // base case: one element in mapping sequence, query directly (property containing mappingSequence term)
    return `
      ?${nextTerm} ?aux${fieldName} ?${fieldName} .
      FILTER regex(str(?aux${fieldName}), "${mappingSequence[0]}", "i")
    `;
  }
  else {
    // recursive case: more than one element in mapping sequence, add link to chain and apply function again over sliced sequence
    return `
      ?${nextTerm} ?pred${fieldName}${mappingSequence.length} ?obj${fieldName}${mappingSequence.length} .
      FILTER regex(str(?pred${fieldName}${mappingSequence.length}), "${mappingSequence[0]}", "i")
      ${unfoldFieldQuery(fieldName, mappingSequence.slice(1, undefined), `obj${fieldName}${mappingSequence.length}`)}
    `;
  }
};

const graphPatternRetrieveArtworks = (options: GetArtworksOptions, mapping: ArtworkFieldMapping) => `
  ${unfoldFieldQuery('author', mapping.author)}
  ${options.filter?.author ? `FILTER regex(str(?author), "${options.filter.author}", "i")` : ''}
  ${unfoldFieldQuery('title', mapping.title)}
  ${unfoldFieldQuery('date', mapping.date)}
  ${options.filter?.date ? `FILTER regex(str(?date), "${options.filter.date}", "i")` : ''}
  ${unfoldFieldQuery('info', mapping.info)}
  ${options.filter?.info ? `FILTER regex(str(?info), "${options.filter.info}", "i")` : ''}
  ${unfoldFieldQuery('location', mapping.location)}
  ${unfoldFieldQuery('src', mapping.src)}
  ${options.filter?.id ? `FILTER regex(str(?id), "${options.filter.id}", "i")` : ''}
  ${options.filter?.ids ? filterRegexField(options.filter?.ids, 'id') : ''}
  ${options.filter?.titleKeywords ? filterRegexField(options.filter?.titleKeywords.split(' '), 'title') : ''}
`;

/*
const graphPatternRetrieveArtworks = (options: GetArtworksOptions) => `
  ?id <http://schema.org/author> ?authorUri .
  ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
  ${options.filter?.author ? `FILTER regex(str(?author), "${options.filter.author}", "i")` : ''}
  ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
  ?id <http://schema.org/dateCreated> ?date .
  ${options.filter?.date ? `FILTER regex(str(?date), "${options.filter.date}", "i")` : ''}
  ?id <http://schema.org/material> ?info .
  ${options.filter?.info ? `FILTER regex(str(?info), "${options.filter.info}", "i")` : ''}
  ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
  ?id <http://schema.org/image> ?imageUri .
  ?imageUri <http://schema.org/url> ?src .
  ${options.filter?.id ? `FILTER regex(str(?id), "${options.filter.id}", "i")` : ''}
  ${options.filter?.ids ? filterRegexField(options.filter?.ids, 'id') : ''}
  ${options.filter?.titleKeywords ? filterRegexField(options.filter?.titleKeywords.split(' '), 'title') : ''}
`;
*/

export const retrieveAllArtworksQuery = (options: GetArtworksOptions, mapping: ArtworkFieldMapping) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT * {
    {
      SELECT ?id ?title ?author ?date ?info ?location ?src WHERE {
        ${graphPatternRetrieveArtworks(options, mapping)}
      }
      ${options.sortingField ? `ORDER BY (LCASE(?${options.sortingField}))` : ''}
      ${(options.pageSize && options.pageNumber) ? `
        LIMIT ${options.pageSize}
        OFFSET ${options.pageSize * (options.pageNumber - 1)}
      ` : ''}
    }
    UNION
    {
      SELECT (count(*) as ?count) { ${graphPatternRetrieveArtworks(options, mapping)} }
    }
  }
`;

export const retrieveDistinctAuthorValuesQuery = (mapping: ArtworkFieldMapping, artworksSubset?: string[]) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?author (COUNT(?author) as ?count) WHERE {
    ${unfoldFieldQuery('author', mapping.author)}
    ${unfoldFieldQuery('title', mapping.title)}
    ${unfoldFieldQuery('date', mapping.date)}
    ${unfoldFieldQuery('info', mapping.info)}
    ${unfoldFieldQuery('location', mapping.location)}
    ${unfoldFieldQuery('src', mapping.src)}
    ${artworksSubset ? filterRegexField(artworksSubset, 'id') : ''}
  }
  GROUP BY ?author
  ORDER BY (LCASE(?author))
`;

export const retrieveDistinctDateValuesQuery = (mapping: ArtworkFieldMapping, artworksSubset?: string[]) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?date (COUNT(?date) as ?count) WHERE {
    ${unfoldFieldQuery('author', mapping.author)}
    ${unfoldFieldQuery('title', mapping.title)}
    ${unfoldFieldQuery('date', mapping.date)}
    ${unfoldFieldQuery('info', mapping.info)}
    ${unfoldFieldQuery('location', mapping.location)}
    ${unfoldFieldQuery('src', mapping.src)}
    ${artworksSubset ? filterRegexField(artworksSubset, 'id') : ''}
  }
  GROUP BY ?date
  ORDER BY (LCASE(?date))
`;

export const retrieveDistinctInfoValuesQuery = (mapping: ArtworkFieldMapping, artworksSubset?: string[]) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?info (COUNT(?info) as ?count) WHERE {
    ${unfoldFieldQuery('author', mapping.author)}
    ${unfoldFieldQuery('title', mapping.title)}
    ${unfoldFieldQuery('date', mapping.date)}
    ${unfoldFieldQuery('info', mapping.info)}
    ${unfoldFieldQuery('location', mapping.location)}
    ${unfoldFieldQuery('src', mapping.src)}
    ${artworksSubset ? filterRegexField(artworksSubset, 'id') : ''}
  }
  GROUP BY ?info
  ORDER BY (LCASE(?info))
`;


//---------------------------------
//            EMOTIONS
//---------------------------------
export const retrieveArtworksWithAtLeastAnEmotionInCommon = (artworkId: string) => `
  PREFIX cult: <http://dati.beniculturali.it/cis/> 
  PREFIX emo: <https://w3id.org/spice/SON/emotion/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX cont: <https://w3id.org/spice/SON/emotionInCulturalContext/>

  SELECT DISTINCT ?id
  WHERE {
    emo:${artworkId} emo:triggers ?emotion.
    ?id emo:triggers ?emotion.
  }
`;

export const retrieveAvailableArtworksWithEmotions = () => `
  PREFIX emo: <https://w3id.org/spice/SON/emotion/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX cont: <https://w3id.org/spice/SON/emotionInCulturalContext/>

  SELECT DISTINCT ?id
  WHERE {
    ?id emo:triggers ?emotion .
    FILTER regex(str(?id), "spiceartefact", "i")
  }
`;