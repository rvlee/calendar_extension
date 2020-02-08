module.exports = (data) => {
  const {
    isNew,
    event: {
      start,
      end,
      eventData
    },
  } = data
  
  if (isNew) {
    return {
      start,
      end,
    }
  }
  return {
    id: eventData.id,
    start,
    end,
    summary: eventData.summary,
    organizer: eventData.organizer.email,
  }
}