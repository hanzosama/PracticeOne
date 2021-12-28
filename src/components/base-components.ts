// Component Base class

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
  
    constructor(
      tamplateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      //Forcing casting
      this.templateElement = document.getElementById(
        tamplateId
      )! as HTMLTemplateElement;
  
      this.hostElement = document.getElementById(hostElementId)! as T;
  
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
  
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element!.id = newElementId;
      }
      this.attach(insertAtStart);
    }
  
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }