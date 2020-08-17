import React from 'react';
import { compose, withStore, withWindowEventHandler, withEffect } from 'hookompose';
import { tap, use } from '@ln613/util';
import { loadChannels, loadChannel } from './api';
import { flHost } from './const';

const App = p =>
  <>
    <div class="fw">
      {p.cats.map(c =>
        <div class="w100">
          <div class="mb4 p8 fs21 fw8 Lavender f cp" onClick={() => p.set(`cats[cat=${c.cat}].isClosed`, x => !x)}>
            <i class={`fas fa-chevron-${c.isClosed ? 'right' : 'down'} fa-sm pt4 pr4`}></i>
            <div class="fg1">{c.name}</div>
          </div>
          {!c.isClosed &&
          <div class="fw ph4">
            {c.chs.map(c1 =>
              <div class={`${p.width > 1280 ? 'w1-6' : 'w50'}`}>
                <div class="card m4" >
                  <div class="cp" onClick={() => p.loadChannel({ cat: c.cat, epg: c1.epg })}>
                    <div class="p4 fw8">{c1.title}</div>
                    <img style={{ height: '50px', objectFit: 'scale-down' }} class="tac w100" src={flHost + c1.icon} />
                  </div>
                  <div class="p4 oys" style={{ height: '150px' }}>
                    {c1.prg.filter(x => x).map(s =>
                      <div class="oxh f" title={s.program}>
                        <div style={{ fontFamily: 'verdana' }}>{toTime(s.time * 1000)}</div>
                        <div> - </div>
                        <div class="fg1">{s.program}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          }
        </div>
      )}
    </div>
    {p.isLoading && 
    <div class="pa op50 Lightgray" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
      <i class="fas fa-spinner fa-spin fa-4x pr" style={{ top: '50%', left: '50%' }}></i>
    </div>
    }
  </>

export default compose(
  withStore(s => s, { loadChannels, loadChannel }),
  withEffect(p => p.cats.map(c => p.loadChannels({ cat: c.cat })), null, p => [p.cats.length > 0]),
  () => ({ width: window.innerWidth }),
  withWindowEventHandler('resize', p => p.set('width', window.innerWidth))
)(App);

const toTime = d => use(new Date(d))(x => `${pad20(x.getHours())}:${pad20(x.getMinutes())}`)
const padLeft = (n, c) => s => use(s.toString().length)(l => l >= n ? s : (c.repeat(n - l) + s))
const pad20 = padLeft(2, '0')
