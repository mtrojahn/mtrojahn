<script>
  import { addTask, deleteTask, settings, tasks, toggleCompleted } from '$lib/stores/GamingTaskStore.js'
  import * as luxon from 'luxon'
  import { onMount } from 'svelte'

  $: daily_tasks = $tasks.filter((task) => task.frequency === 'daily')
  $: weekly_tasks = $tasks.filter((task) => task.frequency === 'weekly')
  $: confs = $settings

  const isDailyExpired = (task) => {
    const splitDailyResetTime = confs.daily_reset_time.split(':')
    const todaysResetTime = luxon.DateTime.local().set({ hour: splitDailyResetTime[0], minute: splitDailyResetTime[1], second: 0 })
    const lastReset = luxon.DateTime.fromISO(task.last_reset)
    return lastReset < todaysResetTime && task.completed
  }

  const isWeeklyExpired = (task) => {
    if (confs.weekly_reset_day !== luxon.DateTime.local().weekday) {
      return false
    }
    const splitWeeklyResetTime = confs.weekly_reset_time.split(':')
    const weeklyResetTime = luxon.DateTime.local().set({
      hour: splitWeeklyResetTime[0],
      minute: splitWeeklyResetTime[1],
      second: 0
    })
    const lastReset = luxon.DateTime.fromISO(task.last_reset)
    return lastReset < weeklyResetTime && task.completed
  }

  onMount(() => {
    $tasks.map(task => {
      if ((task.frequency === 'daily' && isDailyExpired(task)) ||
        (task.frequency === 'weekly' && isWeeklyExpired(task))) {
        task.completed = false
        task.last_reset = luxon.DateTime.local().set({second: 0}).toISO()
      }
      return task
    })
    tasks.set($tasks)
  })


  let new_daily_name = ''
  let new_weekly_name = ''

  const add = (name, frequency) => {
    addTask(name, frequency)
    new_daily_name = ''
    new_weekly_name = ''
  }
</script>

<div class="d-flex flex-row justify-content-between">
  <h6>Daily Tasks</h6>
  <div class="d-flex flex-row">
    <input
      id="daily_task_name"
      type="text"
      class="form-control form-control-sm"
      placeholder="New Task"
      bind:value={new_daily_name}
      style="width: 300px" />
    <button type="button" class="btn btn-primary btn-sm ms-3" on:click={() => add(new_daily_name, "daily")}>
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
  </div>
</div>
<form>
  <div class="row mx-1 mt-4">
    <table class="table">
      <tr>
        <th>Task</th>
        <th class="text-end">Completed</th>
        <th style="width: 400px"></th>
      </tr>
      {#each daily_tasks as task}
        <tr>
          <td>{task.name}</td>
          <td class="text-end">
            <input
              class="form-check-input"
              type="checkbox"
              id={task.id}
              checked={task.completed}
              on:change={() => toggleCompleted(task.id)} />
          </td>
          <td class="text-end">
            <i class="fa fa-trash ms-4" aria-hidden="true" on:click={() => deleteTask(task.id)} style="cursor: pointer">
            </i>
          </td>
        </tr>
      {/each}
    </table>
  </div>
</form>

<hr class="my-4" />

<div class="d-flex flex-row justify-content-between">
  <h6>Weekly Tasks</h6>
  <div class="d-flex flex-row">
    <input
      id="daily_task_name"
      type="text"
      class="form-control form-control-sm"
      placeholder="New Task"
      bind:value={new_weekly_name}
      style="width: 300px" />
    <button type="button" class="btn btn-primary btn-sm ms-3" on:click={() => add(new_weekly_name, "weekly")}>
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
  </div>
</div>
<form>
  <div class="row mx-1 mt-4">
    <table class="table">
      <tr>
        <th>Task</th>
        <th class="text-end">Completed</th>
        <th style="width: 400px"></th>
      </tr>
      {#each weekly_tasks as task}
        <tr>
          <td>{task.name}</td>
          <td class="text-end">
            <input
              class="form-check-input"
              type="checkbox"
              id={task.id}
              checked={task.completed}
              on:change={() => toggleCompleted(task.id)} />
          </td>
          <td class="text-end">
            <i class="fa fa-trash ms-4" aria-hidden="true" on:click={() => deleteTask(task.id)} style="cursor: pointer">
            </i>
          </td>
        </tr>
      {/each}
    </table>
  </div>
</form>
