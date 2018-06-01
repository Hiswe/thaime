<template>
  <div>
    {{ currentTime | hoursMinutesSeconds }}
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    currentTime: DateTime,
  },
}
</script>
