<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewTask extends Mailable
{
    use Queueable, SerializesModels;

    public $task;
    public $user;
    public $priority;

    /**
     * Create a new message instance.
     */
    public function __construct($task, $user, $priority)
    {
        $this->task = $task;
        $this->user = $user;
        $this->priority = $priority;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Task Assigned',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {

        return new Content(
            markdown: 'emails.newTasks'
        )->with([
            'task' => $this->task,
            'user' => $this->user,
            'priority' => $this->priority,
        ]);
    }
}
