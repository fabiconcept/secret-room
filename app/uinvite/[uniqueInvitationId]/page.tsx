export default async function UniqueInvitationPage({ params }: { params: Promise<{ uniqueInvitationId: string }> }) {
    const { uniqueInvitationId } = await params;

    return (
        <div>page</div>
    )
}
