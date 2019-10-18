import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

class TodoList extends HTMLElement {

  // WebComponents lifecycle

  constructor() {
    super();
    this._tasks = [];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.render();
    }
  }

  static get observedAttributes() {
    return ['tasks'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = JSON.parse(newVal);
  }

  render() {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            .success {
                background-color: forestgreen;
                color: white;
            }
            .error {
                background-color: red;
                color: white;
            }
        </style>
        
        <h2>Tasks TO DO</h2>
        <paper-input label="Task" id="taskInput"></paper-input>
        <paper-button class="success" id="saveButton">Save</paper-button>
        <ul>
            ${this.tasks.map((task, index) => `
              <li>${task} <paper-button class="error" id="delete-${index}">Delete</paper-button></li>
            `)}
        </ul>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replaceAll(',', '');

    this.shadowRoot.querySelector('#saveButton').addEventListener('click', () => {
      const task = this.shadowRoot.querySelector('#taskInput');
      this.tasks = [...this.tasks, task.value];
      task.value = '';
    });

    for (const index in this.tasks) {
      this.shadowRoot.querySelector(`#delete-${index}`).addEventListener('click', () => {
        this.tasks.splice(index, 1);
        this.tasks = [...this.tasks];
      });
    }
  }

  // Encapsulation for properties

  /**
   * Tasks for todo-list
   * @type {String}
   */
  set tasks(value) {
    this._tasks = value;
    this.render();
  }

  get tasks() {
    return this._tasks;
  }
}

const register = () => customElements.define('todo-list', TodoList);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
