import { Component } from "./base-components";
import { Validatable, validateInput } from "../utils/validators";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
//Project Input
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");
  
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      this.configure();
    }
  
    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
  
      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
  
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
  
      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };
  
      if (
        !validateInput(titleValidatable) ||
        !validateInput(descriptionValidatable) ||
        !validateInput(peopleValidatable)
      ) {
        alert("Invalud input, try again");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }
    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  
    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
  
    renderContent() {}
  }