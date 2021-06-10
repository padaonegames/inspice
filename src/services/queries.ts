export interface GetArtworksFilter {
  id?: string; // exact
  author?: string; // regex
  date?: string; // exact
  info?: string; // regex
  title?: string; // regex
};

export interface GetArtworksOptions {
  pageNumber?: number;
  pageSize?: number;
  sortingField?: string;
  filter?: GetArtworksFilter;
};

export const retrieveAllArtworksQuery = (options: GetArtworksOptions) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?id ?title ?author ?date ?info ?location ?src WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
    ${options.filter?.author ? `FILTER regex(str(?author), "${options.filter.author}", "i")` : ''}
    ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
    ${options.filter?.title ? `FILTER regex(str(?title), "${options.filter.title}", "i")` : ''}
    ?id <http://schema.org/dateCreated> ?date .
    ${options.filter?.date ? `FILTER regex(str(?date), "${options.filter.date}", "i")` : ''}
    ?id <http://schema.org/material> ?info .
    ${options.filter?.info ? `FILTER regex(str(?info), "${options.filter.info}", "i")` : ''}
    ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
    ?id <http://schema.org/image> ?imageUri .
    ?imageUri <http://schema.org/url> ?src .
    ${options.filter?.id ? `FILTER regex(str(?id), "${options.filter.id}", "i")` : ''}
  }
  ${options.sortingField ? `ORDER BY (LCASE(?${options.sortingField}))` : ''}
  ${(options.pageSize && options.pageNumber) ? `
    LIMIT ${options.pageSize}
    OFFSET ${options.pageSize * (options.pageNumber - 1)}
  ` : ''}
`;

export const retrieveDistinctAuthorValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?author (COUNT(?author) as ?count) WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
    ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
    ?id <http://schema.org/dateCreated> ?date .
    ?id <http://schema.org/material> ?info .
    ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
    ?id <http://schema.org/image> ?imageUri .
    ?imageUri <http://schema.org/url> ?src .
  }
  GROUP BY ?author
  ORDER BY (LCASE(?author))
`;

export const retrieveDistinctDateValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?date (COUNT(?date) as ?count) WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
    ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
    ?id <http://schema.org/dateCreated> ?date .
    ?id <http://schema.org/material> ?info .
    ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
    ?id <http://schema.org/image> ?imageUri .
    ?imageUri <http://schema.org/url> ?src .
  }
  GROUP BY ?date
  ORDER BY (LCASE(?date))
`;

export const retrieveDistinctInfoValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?info (COUNT(?info) as ?count) WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
    ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
    ?id <http://schema.org/dateCreated> ?date .
    ?id <http://schema.org/material> ?info .
    ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
    ?id <http://schema.org/image> ?imageUri .
    ?imageUri <http://schema.org/url> ?src .
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

  SELECT ?id ?label ?emotion
  WHERE {
    emo:${artworkId} emo:triggers ?emotion.
    ?id rdfs:label ?label;
          emo:triggers ?emotion.
  }
`;