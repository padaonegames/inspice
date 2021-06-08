export interface GetArtworksOptions {
  pageNumber?: number;
  pageSize?: number;
  sortingField?: string;
};

export const retrieveAllArtworksQuery = (options: GetArtworksOptions) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?id ?title ?author ?date ?info ?location ?src WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
    ?id <https://w3id.org/arco/ontology/context-description/hasTitle> ?title .
    ?id <http://schema.org/dateCreated> ?date .
    ?id <http://schema.org/material> ?info .
    ?id <https://w3id.org/arco/ontology/arco/hasRelatedAgency> ?location .
    ?id <http://schema.org/image> ?imageUri .
    ?imageUri <http://schema.org/url> ?src
  }
  ${options.sortingField && `ORDER BY (LCASE(?${options.sortingField}))`}
  ${options.pageSize && options.pageNumber && `
    LIMIT ${options.pageSize}
    OFFSET ${options.pageSize * (options.pageNumber + 1)}
  `}
`;

export const retrieveDistinctAuthorValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT DISTINCT ?author WHERE {
    ?id <http://schema.org/author> ?authorUri .
    ?authorUri <http://www.w3.org/2000/01/rdf-schema#label> ?author .
  }
  ORDER BY (LCASE(?author))
`;

export const retrieveDistinctDateValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT DISTINCT ?date WHERE {
    ?id <http://schema.org/dateCreated> ?date .
  }
  ORDER BY (LCASE(?date))
`;

export const retrieveDistinctInfoValuesQuery = () => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT DISTINCT ?info WHERE {
    ?id <http://schema.org/material> ?info .
  }
  ORDER BY (LCASE(?info))
`;