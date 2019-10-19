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
            .header {
              width: 100%;
              height: 200px;
              display: flex;
              justify-content: space-between;
            }
            .container {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
            }
            .button {
              width: 20px;
              height: 12px;
            }
            .danger {
              background-color: red;
                color: white;
            }
        </style>
        
        <div class="container">
            <div class="header">
              <paper-input label="To do list name" id="nameInput"></paper-input>
              <paper-input label="To do list description" id="descriptionInput"></paper-input>
              <paper-button class="button success" id="newTodoButtonSave">Save</paper-button>
            </div> 
          ${this.dashboards.map((dashboard, index) => `
            <div class="dashboard">
              <h2>${dashboard.name}</h2>
              <p>${dashboard.description}</p>
              <paper-button class="button danger" id="todoDelete-${index}">Delete</paper-button>
              <todo-list tasks='${JSON.stringify(dashboard.tasks)}'></todo-list>
            </div>
          `)}
        </div>
      `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('#newTodoButtonSave').addEventListener('click', () => {
      const nameInput = this.shadowRoot.querySelector('#nameInput');
      const descriptionInput = this.shadowRoot.querySelector('#descriptionInput');
      const newTodoList = {
        name: nameInput.value,
        description: descriptionInput.value,
        tasks: []
      };
      this.dashboards = [...this.dashboards, newTodoList];
      nameInput.value = '';
      descriptionInput.value = '';
    });

    for (const index in this.dashboards) {
      this.shadowRoot.querySelector(`#todoDelete-${index}`).addEventListener('click', () => {
        this.dashboards.splice(index, 1);
        this.dashboards = [...this.dashboards];
      });
    }
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
