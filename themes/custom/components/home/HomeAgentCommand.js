import { siteConfig } from '@/lib/config'
import { useState } from 'react'
import CONFIG from '../../config'

/**
 * Agent 命令框占位：终端风格输入，未来接入问答 API
 */
const HomeAgentCommand = () => {
  const enabled = siteConfig('HOME_AGENT_COMMAND_ENABLED', true, CONFIG)
  const [query, setQuery] = useState('')
  const [hint, setHint] = useState('')

  if (!enabled) {
    return null
  }

  const handleSubmit = event => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      return
    }
    // 占位：后续接入 Agent API
    setHint(`agent: pending integration — "${trimmed}"`)
    setQuery('')
  }

  return (
    <div className='home-agent-command'>
      <form className='home-agent-command__form' onSubmit={handleSubmit}>
        <label htmlFor='home-agent-input' className='sr-only'>
          Agent command
        </label>
        <span className='home-agent-command__prompt cyber-mono' aria-hidden>
          &gt;
        </span>
        <input
          id='home-agent-input'
          type='text'
          className='home-agent-command__input cyber-mono'
          placeholder='ask about posts, categories…'
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete='off'
          spellCheck={false}
        />
      </form>
      {hint && (
        <p className='home-agent-command__stdout cyber-mono' role='status'>
          {hint}
        </p>
      )}
    </div>
  )
}

export default HomeAgentCommand
