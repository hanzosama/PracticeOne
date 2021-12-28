// Project State Management
import { Project, ProjectStatus } from "../models/project.js";
type ProjectListener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: ProjectListener<T>[] = [];

  addListener(listenerFn: ProjectListener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private static instance: ProjectState;
  private projects: Project[] = [];

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const selectedProj = this.projects.find((prj) => id === prj.id);
    if (selectedProj && selectedProj.status !== newStatus) {
      selectedProj.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenersFn of this.listeners) {
      listenersFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();