class TodoApp extends HTMLElement {

  // WebComponents lifecycle

  constructor() {
    super();
    this._dashboards = [];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.render();
    }
  }

  static get observedAttributes() {
    return ['dashboards'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  render() {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            .container {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
            }
        </style>
        
        <div class="container">
          ${this.dashboards.map(dashboard => `
            <div class="dashboard">
              <h2>${dashboard.name}</h2>
              <p>${dashboard.description}</p>
              <todo-list tasks='${JSON.stringify(dashboard.tasks)}'></todo-list>
            </div>
          `)}
        </div>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Encapsulation for properties

  /**
   * Tasks for todo-list
   * @type {String}
   */
  set dashboards(value) {
    this._dashboards = value;
    this.render();
  }

  get dashboards() {
    return this._dashboards;
  }
}

const register = () => customElements.define('todo-app', TodoApp);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
