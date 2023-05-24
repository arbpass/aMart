namespace Domain.Models.Payment
{
    public interface IPaymentService
    {
        Task<MerchantOrder> ProcessMerchantOrder(PaymentRequest payRequest);
        Task<string> CompleteOrderProcess(PaymentResponse _paymentResponse);
    }
}
