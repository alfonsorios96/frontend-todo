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
        <h2>Tasks TO DO</h2>
        <ul>
            ${this.tasks.map(task => `<li>${task}</li>`)}
        </ul>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replaceAll('>,', '>');
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
