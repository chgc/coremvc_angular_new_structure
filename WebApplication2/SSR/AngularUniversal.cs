using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;

namespace WebApplication2
{
    public class AngularUniversal
    {
        private HttpRequest _request { get; set; }


        public AngularUniversal(HttpRequest request)
        {
            this._request = request;
        }
        public async Task<RenderToStringResult> Render(string bundlePath, TransferData transferData = null)
        {
            var nodeServices = _request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
            var unencodedPathAndQuery = _request.HttpContext.Features.Get<IHttpRequestFeature>().RawTarget;
            var unencodedAbsoluteUrl = $"{_request.Scheme}://{_request.Host}{unencodedPathAndQuery}";

            // ** TransferData concept **
            // Here we can pass any Custom Data we want !
            // By default we're passing down Cookies, Headers, Host from the request object here
            if (transferData is null)
            {
                transferData = new TransferData(this._request);
            }

            //Prerender now needs CancellationToken            
            System.Threading.CancellationToken cancelToken = new System.Threading.CancellationTokenSource().Token;

            // Prerender / Serialize application (with Universal)
            var prerenderResult = await Prerenderer.RenderToString(
                "/",
                nodeServices,
                cancelToken,
                new JavaScriptModuleExport(bundlePath),
                unencodedAbsoluteUrl,
                unencodedPathAndQuery,
                transferData, // Our simplified request object & any other CustommData you want to send!
                30000,
                this._request.PathBase.ToString()
            );
            return prerenderResult;
        }


    }

    public class IRequest
    {
        public object cookies { get; set; }
        public object headers { get; set; }
        public object host { get; set; }
    }


    public partial class TransferData
    {
        public dynamic request { get; set; }

        public TransferData(HttpRequest request)
        {
            this.request = AbstractHttpContextRequestInfo(request);
        }


        // Your data here ?        
        private static IRequest AbstractHttpContextRequestInfo(HttpRequest request) => new IRequest()
        {
            cookies = request.Cookies,
            headers = request.Headers,
            host = request.Host
        };

    }
}
