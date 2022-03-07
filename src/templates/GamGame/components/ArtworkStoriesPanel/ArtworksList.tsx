import { useState } from 'react';
import { ArtworkGrid } from '../generalStyles';
import SearchBar from '../../../../components/Forms/SearchBar';
import ArtworkColumnElement from '../../../../components/ArtworkSelection/ArtworkColumnElement';
import { ArtworkData } from '../../../../services/artwork.model';
import { useTranslation } from 'react-i18next';

export interface ArtworksListProps {
  /** Artworks to be rendered within this component */
  artworks: ArtworkData[];
  /** Callback to parent specifying that a given artwork with artwork has been selected */
  onArtworkSelected?: (artworkId: string) => void;
};

export const ArtworksList = (props: ArtworksListProps): JSX.Element => {

  const { t } = useTranslation('gamGame');
  const { artworks, onArtworkSelected } = props;

  const [filter, setFilter] = useState<string>('');

  const displayArtworks = artworks.filter(elem =>
    elem.title.toLowerCase().includes(filter) ||
    elem.author.toLowerCase().includes(filter)
  );

  return (
    <>
      <SearchBar
        placeholder={t('searchArtworksByTitleOrAuthor')}
        onSearchPerformed={(search) => setFilter(search)}
      />

      <ArtworkGrid>
        {displayArtworks.map(elem => (
          <ArtworkColumnElement
            key={elem.id}
            artworkData={elem}
            onCardClicked={() => {
              if (onArtworkSelected) {
                onArtworkSelected(elem.id);
              }
            }}
          />
        ))}
      </ArtworkGrid>
    </>
  );
};

export default ArtworksList;