import React from 'react';
import { compose, withStore, withWindowEventHandler, withEffect } from 'hookompose';
import { tap, use } from '@ln613/util';
import { loadChannels } from './api';
import { flHost } from './const';

const App = p =>
  <div class="fw">
    {tap(p).cats.map(c =>
      <div class="w100">
        <div class="mb4 p4 fs21 fw8 Lavender">{c.name}</div>
        <div class="fw ph4">
          {c.chs.map(c1 =>
            <div class={`${p.width > 960 ? 'w1-6' : (p.width > 640 ? 'w25' : 'w50')}`}>
              <div class="card m4" >
                <a href={`${flHost}embed/hlsjs?mufu://${c1.epg.replace('-', '')}hd`} class="tac" target="_blank">
                  <div class="p4 fw8">{c1.title}</div>
                  <img style={{ height: '50px', objectFit: 'scale-down' }} class="tac w100" src={flHost + c1.icon} />
                </a>
                <div class="p4 oys" style={{ height: '150px' }}>
                  {c1.prg.filter(x => x).map(s =>
                    <div class="oxh" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.program}>
                      <span style={{ fontFamily: 'verdana' }}>{toTime(s.time * 1000)}</span> - {s.program}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>

export default compose(
  withStore(s => s, { loadChannels }),
  withEffect(p => p.cats.map(c => p.loadChannels({ cat: c.cat })), null, p => [p.cats.length > 0]),
  () => ({ width: window.innerWidth }),
  withWindowEventHandler('resize', p => p.set('width', window.innerWidth))
)(App);

const toTime = d => use(new Date(d))(x => `${pad20(x.getHours())}:${pad20(x.getMinutes())}`)
const padLeft = (n, c) => s => use(s.toString().length)(l => l >= n ? s : (c.repeat(n - l) + s))
const pad20 = padLeft(2, '0')
//cntvtb