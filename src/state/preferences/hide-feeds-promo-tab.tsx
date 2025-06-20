import React from 'react'

import * as persisted from '#/state/persisted'

// Preference: hideFeedsPromoTab – when true, suppress the "Feeds ✨" promotional tab in HomeHeader.

type StateContext = persisted.Schema['hideFeedsPromoTab']
// Same setter signature used across other preference modules
type SetContext = (v: persisted.Schema['hideFeedsPromoTab']) => void

const stateContext = React.createContext<StateContext>(
  persisted.defaults.hideFeedsPromoTab,
)
const setContext = React.createContext<SetContext>(
  (_: persisted.Schema['hideFeedsPromoTab']) => {},
)

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(persisted.get('hideFeedsPromoTab'))

  const setStateWrapped = React.useCallback(
    (value: persisted.Schema['hideFeedsPromoTab']) => {
      setState(value)
      persisted.write('hideFeedsPromoTab', value)
    },
    [setState],
  )

  React.useEffect(() => {
    return persisted.onUpdate('hideFeedsPromoTab', next => {
      setState(next)
    })
  }, [setStateWrapped])

  return (
    <stateContext.Provider value={state}>
      <setContext.Provider value={setStateWrapped}>
        {children}
      </setContext.Provider>
    </stateContext.Provider>
  )
}

export function useHideFeedsPromoTab() {
  return React.useContext(stateContext)
}

export function useSetHideFeedsPromoTab() {
  return React.useContext(setContext)
} 