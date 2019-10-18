import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button';
import '@polymer/paper-listbox';
import '@polymer/paper-item';
import '@polymer/paper-checkbox';

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
            .container {
                width: 600px;
            }
            .success {
                background-color: forestgreen;
                color: white;
            }
            .error {
                background-color: red;
                color: white;
            }
            .list {
                width: 100%;
            }
            .item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                --paper-item-selected-weight: italic;
            }
            .completed {
                --paper-checkbox-label-checked-color: darkgrey;
                --paper-checkbox-label: {
                    text-decoration:line-through;
                }
            }
            .button {
                width: 20px;
                height: 12px;
            }
        </style>
        <div class="container">
            <paper-input label="Task" id="taskInput"></paper-input>
            <paper-button class="button success" id="saveButton">Save</paper-button>
            <paper-listbox class="list">
                ${this.tasks.map((task, index) => `
                  <paper-item class="item" id="item-${index}">
                      <paper-checkbox id="complete-${index}" noink>${task}</paper-checkbox> <paper-button class="button error" id="delete-${index}">Delete</paper-button>
                  </paper-item>
                `)}
            </paper-listbox>
        </div>
      `;

    ShadyCSS.prepareTemplate(template, 'my-el');

    if (this.shadowRoot) {
      ShadyCSS.styleElement(this);
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

      for (const index in this.tasks) {
        this.shadowRoot.querySelector(`#complete-${index}`).addEventListener('checked-changed', event => {
          const checked = event.detail.value;
          const item = event.currentTarget;
          checked ? item.classList.add('completed') : item.classList.remove('completed');
        });
      }
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
