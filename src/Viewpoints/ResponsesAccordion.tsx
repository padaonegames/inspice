import React from 'react';
import styled from 'styled-components';
import { ArtworkResponses } from './ViewpointsResultsComponent';
import AccordionItem from './AccordionItem';

const Root = styled.ul`
`;

interface ResponsesAccordionProps {
  responsesByArtwork: ArtworkResponses[];
};

const ResponsesAccordion: React.FC<ResponsesAccordionProps> = ({ responsesByArtwork }) => {

  return (
    <Root>
      {responsesByArtwork.map(resp => (
        <AccordionItem 
          artwork={resp.artwork}
          responses={resp.responses}
        />
      ))}
    </Root>
  );
};

export default ResponsesAccordion;

/*

<div class="accordion accordion-flush" id="artworkAccordion">

          <div *ngFor="let artwork of artworkResponsesArr; let i = index">
            <div *ngIf="(i == -1)" class="accordion-item">


                <h2 class="accordion-header"
                    id="{{'heading_' + artwork[0].artworkID}}">
                  <button class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          [attr.data-bs-target]="'#collapse_' + artwork[0].artworkID"
                          aria-expanded="true"
                          [attr.aria-controls]="'collapse_'+ artwork[0].artworkID">
                    <em>{{artwork[0].artworkName}}<br />({{artwork.length}} responses)</em>
                  </button>

                </h2>
                <div id="{{'collapse_' + artwork[0].artworkID}}"
                     class="accordion-collapse collapse show"
                     [attr.aria-labelledby]="'heading_' + artwork[0].artworkID"
                     data-bs-parent="#artworkAccordion">
                  <div class="accordion-body">
                    <img src="{{'https://spice.kmi.open.ac.uk/demos/imma_api/main.php?action=artworkimage&filename=' + artwork[0].artworkImage}}" class="img-fluid">

                    <div *ngFor="let response of artwork; let j = index">
                      <div *ngIf="j < recentArtworkCount">
                        <p><strong>{{response.questionAsked}}</strong><br />{{response.response}}</p>
                      </div>
                    </div>
                  </div>
                </div>


            </div>

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