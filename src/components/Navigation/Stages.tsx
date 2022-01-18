import React from 'react';

function invariant(cond: any, message: string): asserts cond {
  if (!cond) throw new Error(message);
}


/**
 * Defines a stage object which can either be a terminal stage
 * or a parent stage with a sequence of nested stages.
 */
export interface StageObject {
  children?: StageObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
};


export interface StagesProps {
  children?: React.ReactNode;
  location?: string;
}

export function Stages({ children, location }: StagesProps): React.ReactElement | null {

  return (
    <></>
  );
};


export const Stage: React.FC = () => {
  
  return (
    <></>
  );

};

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/docs/en/v6/api#createroutesfromchildren
 */
 export function createStagesFromChildren(
  children: React.ReactNode
): StageObject[] {
  let stages: StageObject[] = [];

  React.Children.forEach(children, element => {
    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.type === React.Fragment) {
      // Transparently support React.Fragment and its children.
      stages.push.apply(
        stages,
        createStagesFromChildren(element.props.children)
      );
      return;
    }

    invariant(
      element.type === Stage,
      `[${
        typeof element.type === "string" ? element.type : element.type.name
      }] is not a <Route> component. All component children of <Stages> must be a <Stage> or <React.Fragment>`
    );

    let route: StageObject = {
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };

    if (element.props.children) {
      route.children = createStagesFromChildren(element.props.children);
    }

    stages.push(route);
  });

  return stages;
}