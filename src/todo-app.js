import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

class TodoApp extends HTMLElement {

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
    this[name] = newVal;
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
        <paper-input label="Task"></paper-input>
        <paper-button class="success">Save</paper-button>
        <ul>
            ${this.tasks.map(task => `
              <li>${task} <paper-button class="error">Delete</paper-button></li>
            `)}
        </ul>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replaceAll(',', '');
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

const register = () => customElements.define('todo-app', TodoApp);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
