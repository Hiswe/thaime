<template>
  <div>
    {{ currentTime | hoursMinutesSeconds }}
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: `timer-24`,
  props: {
    currentTime: DateTime,
  },
}
</script>
