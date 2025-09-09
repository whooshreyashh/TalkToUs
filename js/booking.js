// JS flatpicker for date and time

<script>
  // Date picker
  flatpickr("#date", {
    dateFormat: "Y-m-d",
    minDate: "today"
  });

  // Time picker (restricted 10AM – 6PM)
  flatpickr("#time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    minTime: "10:00",
    maxTime: "18:00"
  });
</script>
