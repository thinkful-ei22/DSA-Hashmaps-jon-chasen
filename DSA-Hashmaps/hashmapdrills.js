'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    if (!this._slots[index]) {
      this.length++;
    }
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.7;
HashMap.SIZE_RATIO = 3;

const main = () => {
  let lotr = new HashMap();

  // lotr.set('Hobbit', 'Bilbo');
  // lotr.set('Hobbit', 'Frodo');
  // lotr.set('Wizard', 'Gandolf');
  // lotr.set('Human', 'Aragon');
  // lotr.set('Elf', 'Legolas');
  // lotr.set('Maiar', 'The Necromancer');
  // lotr.set('Maiar', 'Sauron');
  // lotr.set('RingBearer', 'Gollum');
  // lotr.set('LadyOfLight', 'Galadriel');
  // lotr.set('HalfElven', 'Arwen');
  // lotr.set('Ent', 'Treebeard');

  

  // console.log((JSON.stringify(lotr, null, 2)));

  // console.log(lotr.get('Maiar'));
};

main();


// Palindrome

const palindrome = string => {
  let stringHashMap = new HashMap();
  let odd = 0;
  for (let i = 0; i < string.length; i++) {
      try {
          let charCount = stringHashMap.get(string[i]);
          charCount ++;
          if(charCount % 2 === 0) {
              odd --;
          } else {
              odd++;
          }
          stringHashMap.set(string[i], charCount);
      } catch {
          stringHashMap.set(string[i], 1)
          odd ++;
      }
  }
  if (string.length % 2 === 0 && odd === 0
      || string.length % 2 === 1 && odd === 1){
      return true;
  } else {
      return false;
  }
}

console.log(palindrome('race'));