<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TaskDue extends Mailable
{
    use Queueable, SerializesModels;

    public $task;
    public $priority;
        

    /**
     * Create a new message instance.
     */
    public function __construct($task, $priority)
    {
        //
        $this->task = $task;
        $this->priority = $priority;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Task Due',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.taskDue',
        )->with([
            'task' => $this->task,
            'user' => $this->user,
            'priority' => $this->priority,
        ]);
    }

}
