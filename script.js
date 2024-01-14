$(document).ready(function () {
    const calendar = $('#calendar').evoCalendar({
        theme: "Midnight Blue",
        preventPast: true, // This option prevents the selection of past dates
    });

    // Set a timed alert
    function setTimedAlert(eventName, eventDateTime) {
        const eventTime = new Date(eventDateTime).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = eventTime - currentTime;

        if (timeDifference > 0) {
            setTimeout(function () {
                alert(`Reminder: Hey, don't forget about ${eventName}!`);
            }, timeDifference);
        }
    }

     // Set the min attribute for the date input field
     const currentDate = new Date().toISOString().split('T')[0];
     $('#event-date').attr('min', currentDate);
 
     // Event listener for date input change
     $('#event-date').on('change', function() {
         const selectedDate = $(this).val();
         if (selectedDate < currentDate) {
             $(this).val(currentDate);
         }
     });

    // Function to delete an event
    function deleteEvent(eventId) {
        calendar.evoCalendar('removeCalendarEvent', eventId);
        $(`#${eventId}`).remove();
    }

    // Updated JavaScript code for form submission and error handling
    $('#event-form').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const eventName = $('#event-name').val();
        const eventDate = $('#event-date').val();
        const eventTime = $('#event-time').val();

        // Basic validation using custom alert
        if (eventName && eventDate && eventTime) {
            // Adding the event logic
            const eventId = `event-${Date.now()}`;
            calendar.evoCalendar('addCalendarEvent', {
                id: eventId,
                name: eventName,
                date: `${eventDate} ${eventTime}`,
                description: 'Newly added event',
                type: 'event'
            });

            //changing format of date
            const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });

            // Set a timed alert for the event
            setTimedAlert(eventName, `${eventDate} ${eventTime}`);

            // Display a success message
            alert('Event added successfully!');

            // Optionally, you can reset the form after successful submission
            $('#event-form')[0].reset();

            // Add the event to the event container for deletion
            $('#event-container').append(`
                <div class="event" id="${eventId}">
                <span class="event-date">${formattedDate}</span>
                <span class="event-name">${eventName}</span>
                    <button class="delete-event-button" data-event-id="${eventId}">Delete</button>
                </div>
            `);
        } else {
            // Display error message using custom alert
            alert('Please fill in all fields.');
        }
    });

    // Event delegation for dynamically added delete buttons
    $('#event-container').on('click', '.delete-event-button', function () {
        const eventId = $(this).data('event-id');
        deleteEvent(eventId);
    });
});
