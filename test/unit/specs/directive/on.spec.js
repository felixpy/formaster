import Formotor from 'src/index'

const JZ = Formotor.JZ

describe('fm-on directive', () => {
  JZ('<div class="wrapper"></div>').appendTo('body')
  beforeEach(() => {
    JZ('.wrapper').empty()
  })

  test('bind', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <div id="foo" fm-on:click.alfa="doSomeThing" fm-on:click.bravo="wave"></div>
        <div id="bar" fm-on:click="doSomeThing"></div>
        <div id="zoo" fm-on:click.alfa="doSomeThing" fm-on:click.bravo="wave" fm-on:click.charlie="wave"></div>
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        doSomeThing ($event) {
          this.x = this.x + 3

          expect($event.type).toBe('click')
        },
        wave () {
          this.x = this.x + 7
        }
      }
    })

    comp.$find('#foo').trigger('click')

    expect(comp.x).toBe(10)

    comp.$find('#bar').trigger('click')

    expect(comp.x).toBe(13)

    comp.$find('#zoo').trigger('click')

    expect(comp.x).toBe(30)
  })

  test('proxy', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <div class="j-foo" fm-on:click="doSomeThing"></div>
        <div class="j-foo"></div>
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        doSomeThing () {
          this.x = this.x + 1
        }
      }
    })

    comp.$find('.j-foo:first').trigger('click')

    expect(comp.x).toBe(1)

    comp.$find('.j-foo:last').trigger('click')

    expect(comp.x).toBe(2)
  })

  test('stop propagation', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <div class="j-foo" fm-on:click="foo">
          <div class="j-bar" fm-on:click.stop="bar"></div>
          <div class="j-zoo" fm-on:click="zoo"></div>
        </div>
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        foo () {
          this.x = this.x + 1
        },
        bar () {
          this.x = this.x + 3
        },
        zoo () {
          this.x = this.x + 5
        }
      }
    })

    comp.$find('.j-bar').trigger('click')

    expect(comp.x).toBe(3)

    comp.$find('.j-zoo').trigger('click')

    expect(comp.x).toBe(9)
  })

  test('prevent default', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <input type="checkbox" value="1" name="foo" @click.prevent="doSomeThing">
        <input type="checkbox" value="2" name="bar" @click="doSomeThing">
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        doSomeThing () {}
      }
    })

    comp.$find(':checkbox').trigger('click')

    const values = comp.$get()

    expect(values.foo).toBeUndefined()
    expect(values.bar).toEqual(['2'])
  })

  test('modifier self', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <div class="j-foo" fm-on:click.self="doSomeThing">
          <div class="j-bar"></div>
        </div>
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        doSomeThing () {
          this.x = this.x + 1
        }
      }
    })

    comp.$find('.j-bar').trigger('click')

    expect(comp.x).toBe(0)

    comp.$find('.j-foo').trigger('click')

    expect(comp.x).toBe(1)
  })

  test('modifier keycode', () => {
    JZ('.wrapper').append(`
      <div fm-app>
        <input type="text" class="j-foo" fm-on:keyup.left="doSomeThing"
      </div>
    `)
    const comp = new Formotor({
      el: '[fm-app]',
      data: {
        x: 0
      },
      methods: {
        doSomeThing ($event) {
          this.x = this.x + 1
        }
      }
    })

    comp.$find('.j-foo').trigger(JZ.Event('keyup', {
      keyCode: 39
    }))

    expect(comp.x).toBe(0)

    comp.$find('.j-foo').trigger(JZ.Event('keyup', {
      keyCode: 37
    }))

    expect(comp.x).toBe(1)
  })
})
