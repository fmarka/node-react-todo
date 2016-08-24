import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import TodoAppComponent from '../components/TodoApp.js';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import jQuery from "jquery";

let {
  assert,
  expect
} = chai;
const renderer = ReactTestUtils.createRenderer();

chai.should();
chai.use(sinonChai);

const Simulate = ReactTestUtils.Simulate;
const TestComponentApp = React.createFactory(TodoAppComponent);

let data = {
  items: [{
    "_id": 1,
    "title": "Watch movie",
    "text": "Watch new Game of Thrones episodes",
    "completed": 1
  }, {
    "_id": 2,
    "title": "Flight to Paris",
    "text": "Buy tickets",
    "completed": 0
  }, ]
}


describe('TodoApp', () => {

  let componentApp, renderedDOM, items, input, text, button;

  beforeEach(() => {
    componentApp = ReactTestUtils.renderIntoDocument(TestComponentApp({
      items: data.items
    }));
    renderedDOM = () => ReactDOM.findDOMNode(componentApp);

    items = renderedDOM().querySelectorAll("div.item");
    input = renderedDOM().querySelectorAll("input[type='text']");
    text = renderedDOM().querySelectorAll("textarea");
    button = renderedDOM().querySelectorAll("input[type='submit']");

  });

  it('Elements count', () => {
    expect(items.length).to.equal(2);
    expect(input.length).to.equal(1);
    expect(text.length).to.equal(1);
  });

  it('Ensure that completed items quantity is equal to rendered completed items quantity', () => {

    let completed = 0;
    let renderedCompleted = 0;

    data.items.forEach((item, index) => {
      if (item.completed)
        completed++;
    })

    let todoItems = [].slice.call(items);
    todoItems.forEach((item, index) => {
      if (item.classList.contains("item_completed"))
        renderedCompleted++;
    })
    expect(renderedCompleted).to.equal(completed);

  });

  it('Should delete an item', () => {

    let deleteIcon = items[0].querySelector(".fa-times");
    Simulate.click(deleteIcon);
    expect(items.length).to.equal(2);

  });

  it('Should change button title on item edit', () => {

    let editIcon = items[0].querySelector(".fa-pencil");
    Simulate.click(editIcon);
    expect(button[0].value).to.equal("Edit");

  });

  it('Should submit form', () => {

    var spy = sinon.spy(jQuery, 'ajax');
    let form = renderedDOM().querySelector("form");
    Simulate.submit(form);
    expect(spy).to.have.been.called;
    jQuery.ajax.restore();

  });

});