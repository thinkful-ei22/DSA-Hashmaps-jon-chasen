'use strict';

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while(tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(before, item) {
    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== before) {
      prevNode = currNode;
      currNode = currNode.next;

      if (currNode === null) {
        console.log('Item does not exist');
      }
    }
    prevNode.next = new _Node(item, currNode);
  }



  insertAfter(after, item) {
    let currNode = this.head;
    let nextNode = this.head;

    while (currNode !== null && currNode.value !== after) {
      currNode = nextNode;
      nextNode = nextNode.next;

      if (currNode === null) {
        console.log('Item does not exist');
      }
    }
    currNode.next = new _Node(item, nextNode);
  }

  insert(item, position) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    let currentPosition = 0;
    
    while(currentPosition !== position) {
      prevNode = currNode;
      currNode = currNode.next;
      currentPosition ++;
    }
    let newItem = new _Node(item, currNode);
    prevNode.next = newItem;
  }
    
  insertCycle(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while(tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, this.head);
    }
  }

  find(item) {

    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      currNode = currNode.next;
    }
    return currNode;
  }
  

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
}

const display = (list) => {
  let currNode = list.head;

  while (currNode !== null) {
    console.log(currNode.value);
    currNode = currNode.next;
  }
};

const size = (list) => {
  let currNode = list.head;
  let count = 0;
  while (currNode !== null) {
    count +=1;
    currNode = currNode.next;
  }
  console.log(count);
};

const isEmpty = (list) => {
  return list.head === null ? true : false;
};

const findPrevious = (item, list) => {
  let currNode = list.head;
  let prevNode = list.head;

  while(currNode.value !== item && currNode !== null) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  return prevNode.value;
};

const findLast = (list) => {
  let currNode = list.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  return currNode.value;
};

module.exports = LinkedList;