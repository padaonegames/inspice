import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Artwork } from '../../services/viewpointsArtwork.model';
import { Response } from '../../services/viewpointsResponse.model';

const Root = styled.li`

`;

const Accordion = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;

  &:hover {
    background-color: #ccc;
  }
`;

const ControlIcon = styled.span`
  float: right;
`;

interface AccordionPanelProps {
  height: string;
};
const AccordionPanel = styled.div<AccordionPanelProps>`
  padding: 0 18px;
  background-color: white;
  height: ${props => props.height};
  overflow: hidden;
  transition: height 0.2s ease-out;
`;

export interface AccordionItemProps {
  artwork: Artwork;
  responses: Response[];
  defaultToggled?: boolean;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ artwork, responses, defaultToggled = false }) => {

  const [toggled, setToggled] = useState<boolean>(defaultToggled);
  const contentEl = useRef<any>();

  const toggle = () => {
    setToggled(prev => !prev);
  };

  return (
    <>
      <Accordion onClick={toggle}>
        {artwork.name}
        <ControlIcon>{toggled ? '—' : '+'}</ControlIcon>
      </Accordion>
      <AccordionPanel ref={contentEl} height={`${toggled ? contentEl.current.scrollHeight : 0}px`}>
        <h2>
          <img src={'https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=' + artwork?.image} />
          {artwork?.name}
        </h2>
      </AccordionPanel>
    </>
  );
};

export default AccordionItem;

/*

<div class="accordion accordion-flush" id="artworkAccordion">

          <div *ngFor="let artwork of artworkResponsesArr; let i = index">
            <div *ngIf="(i >= 0)" class="accordion-item">


                <h2 class="accordion-header"
                    id="{{'heading_' + artwork[0].artworkID}}">
                  <button class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          [attr.data-bs-target]="'#collapse_' + artwork[0].artworkID"
                          aria-expanded="false"
                          [attr.aria-controls]="'collapse_'+ artwork[0].artworkID">
                    <em>
                      <img src="{{'https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=' + artwork[0].artworkImage}}" class="img-fluid">
                      {{artwork[0].artworkName}}
                      <!--
                      <br />({{artwork.length}} responses)
                      -->
                    </em>
                  </button>
                </h2>
                <div id="{{'collapse_' + artwork[0].artworkID}}"
                     class="accordion-collapse collapse"
                     [attr.aria-labelledby]="'heading_' + artwork[0].artworkID"
                     data-bs-parent="#artworkAccordion">
                  <div class="accordion-body">
                    <div class="row py-1">
                      <div class="col-4 text-nowrap align-middle"><small>Responses </small></div>
                      <div class="col-8">
                        <div class="progress">
                          <div class="progress-bar bg-success"
                               role="progressbar"
                               [attr.aria-valuenow]="artwork.length"
                               [attr.aria-valuemin]="0"
                               [attr.aria-valuemax]="artworkMaxResponses + (artworkMaxResponses * 0.1)"
                               style="width: {{artwork.length / (artworkMaxResponses * 1.1) * 100}}%">
                            <!-- {{artwork.length}} -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <img src="{{'https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=' + artwork[0].artworkImage}}" class="img-fluid"> -->
                    <p>
                      <small>
                        <span class="fw-bold">{{artwork[0].artworkArtist}}</span><br />
                        <span>{{artwork[0].artworkDate}}</span>
                      </small>
                    </p>
                    <div *ngFor="let response of artwork; let j = index">
                      <div *ngIf="j < recentArtworkCount">
                        <p><strong>{{response.questionAsked}}</strong><br />{{response.response}}</p>
                      </div>
                    </div>
                  </div>
                </div>


            </div>

          </div> <!-- end div loop -->

        </div> <!-- end accordion container -->
 */