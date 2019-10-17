class TodoApp extends HTMLElement {

  // WebComponents lifecycle

  constructor() {
    super();
    this._tasks = [];
  }

  connectedCallback() {
    this._tasks = ['tarea 1', 'tarea 2'];

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
        <h2>Tareas por hacer</h2>
        <ul>
            ${this.tasks.map(task => `<li>${task}</li>`)}
        </ul>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Encapsulation

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
